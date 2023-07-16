import Gig from "../models/gig.model.js"
import User from '../models/user.model.js'
import createError from "../utils/createError.js"

// create a gig
export const createGig = async (req, res, next) => {
  try {
    if (!req.isSeller) { // -> thông qua middleware verifyToken đã gán id và isSeller vào req
      return next(createError(403, "Only seller can create a gig"))
    }

    const newGig = new Gig({
      userId: req.userId,
      ...req.body
    })

    const saveGig = await newGig.save()
    res.status(201).json(saveGig)
  } catch (err) {
    return next(err)
  }
}

// delete a gig
export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!req.isSeller) return next(createError(403, "Only seller can delete Gig"))
    if (!gig) return next(createError(404, "Gig not found"))
    if (gig.userId !== req.userId) return next(createError(403, "You can only delete you Gig"))

    await Gig.findByIdAndDelete(req.params.id)
    return res.status(200).send({ "message": "Deleted Gig successfully" })
  } catch (err) {
    return next(err)
  }
}

// get single gig
export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return next(createError(404, "Gig not found"))
    return res.status(200).json(gig)
  } catch (err) {
    return next(err)
  }
}

// get all gigs
export const getAllGigs = async (req, res, next) => {
  const query = req.query;

  console.log('query: ', query)

  // query price condition
  // 0: all price 
  // (1) Nếu req.query.price !== 0 -> tra cứu theo req.query.priceType 
  // (2) Nếu req.query.priceType === 0 -> req.query.priceType === 0 khi !req.query.price -> tra cứu all theo giá >= 0
  // req.query.priceType === 1: $lte - less than or equal
  // req.query.priceType === 2: $gte - greater than or equal
  // -> code: "...(query.price && { price: Number(req.query.priceType) === 0 ? { $gte: 0 } : (Number(req.query.priceType) === 1 ? { $lte: query.price } : { $gte: query.price }) })"

  const filters = {
    ...query.userId && { userId: query.userId },
    ...query.cat && { cat: query.cat },
    ...(query.min || query.max) && {
      price: {
        ...(query.min && { $gte: query.min }), ...(query.max && { $lte: query.max })
      },
    },
    ...query.title && { title: { $regex: query.search, $options: "i" } }
  }

  try {
    const gigs = await Gig.find(filters).sort({ [query.sort]: [query.sortAvg] })
    if (!gigs.length) return next(createError(404, "No gigs"))

    let gigItems = []

    Promise.all(gigs.map(async (gig) => {
      const user = await User.findById(gig.userId)
      const gigItem = { ...gig._doc, pp: user.img }
      return gigItem
    })).then(result => {
      gigItems.push(...result)
      return res.status(200).json(gigItems)
    })

    // return res.status(200).json(gigs)
  } catch (err) {
    return next(err)
  }
}
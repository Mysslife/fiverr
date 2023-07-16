import Review from "../models/review.model.js"
import Gig from "../models/gig.model.js"
import User from '../models/user.model.js'
import createError from "../utils/createError.js"

// create a review
export const createReview = async (req, res, next) => {
  if (req.isSeller) {
    return next(createError(403, "Sellers can't create a review!"))
  }

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  })

  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId
    })

    if (review) return next(createError(403, "You have already created a review for this gig!"))

    const savedReview = await newReview.save()

    await Gig.findByIdAndUpdate(req.body.gigId, { $inc: { totalStars: req.body.star, starNumber: 1 } })

    res.status(201).json(savedReview)
  } catch (err) {
    return next(err)
  }
}

// delete a review
// export const deleteReview = async (req, res, next) => {
//   try {
//     const gig = await Gig.findById(req.params.id);

//     if (!req.isSeller) return next(createError(403, "Only seller can delete Gig"))
//     if (!gig) return next(createError(404, "Gig not found"))
//     if (gig.userId !== req.userId) return next(createError(403, "You can only delete you Gig"))

//     await Gig.findByIdAndDelete(req.params.id)
//     return res.status(200).send({ "message": "Deleted Gig successfully" })
//   } catch (err) {
//     return next(err)
//   }
// }

// get reviews
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    return res.status(201).json(reviews)
  } catch (err) {
    return next(err)
  }
}

// // get all reviews
// export const getAllGigs = async (req, res, next) => {
//     const query = req.query;

//     const filters = {
//         ...query.userId && { userId: query.userId },
//         ...query.cat && { cat: query.cat },
//         ...(query.min || query.max) && {
//             price: {
//                 ...(query.min && { $gte: query.min }), ...(query.max && { $lte: query.max })
//             },
//         },
//         ...query.title && { title: { $regex: query.search, $options: "i" } }
//     }

//     try {
//         const gigs = await Gig.find(filters).sort({ [query.sort]: [query.sortAvg] })
//         if (!gigs.length) return next(createError(404, "No gigs"))

//         let gigItems = []

//         Promise.all(gigs.map(async (gig) => {
//             const user = await User.findById(gig.userId)
//             const gigItem = { ...gig._doc, pp: user.img }
//             return gigItem
//         })).then(result => {
//             gigItems.push(...result)
//             return res.status(200).json(gigItems)
//         })

//         // return res.status(200).json(gigs)
//     } catch (err) {
//         return next(err)
//     }
// }
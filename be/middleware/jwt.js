import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
	const token = req.cookies.accessToken; // -> accessToken = key name của token khi trả về trình duyệt khi đăng nhập lần đầu tiên thành công
	if (!token) return res.status(401).send({ "message": "You are not authenticated!" })

	jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
		if (err) return res.status(403).send({ "message": err.message })

		// -> Trong middleware này, jwt verify token để gán thêm 2 trường userId và isSeller vào mỗi req trước khi đến các services. Không cần gán vào trong req.body
		req.userId = payload.id;
		req.isSeller = payload.isSeller;
		next() // -> Quan trọng, vì khi xử lý đến cuối hàm, nếu không có next() thì sẽ không thực hiện tiếp đến service mà sẽ dừng tại đây
	})
}

import axios from "axios"
const NO_AVATAR = "https://bonbien.vn/public/upload/no-avatar.png"

const upload = async (file) => {
	const data = new FormData()
	data.append("file", file)
	data.append("upload_preset", "fiverr")

	if (file) {
		try {
			const res = await axios.post("https://api.cloudinary.com/v1_1/mysslife/image/upload", data)
			const { url } = res.data

			return url
		} catch (err) {
			console.log('upload img error: ', err)
		}
	} else {
		return NO_AVATAR
	}
}

export default upload
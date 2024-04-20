import instance from "./instance"

export const Banners = async(payload)=>{
    try {
        const response = await instance.post('admin/add_banner', payload)
        return response
    } catch (error) {
        return error.response
    }
}
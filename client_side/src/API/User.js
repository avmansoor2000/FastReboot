import instance from "./instance"

export const users = async (payload)=>{
    try {
        const response = await instance.post('api/admin/add_user', payload)
        return response
    } catch (error) {
        return error.response
    }
}
import instance from "./instance"

export const Mentors = async(payload)=>{
    try {
        const reponse = await instance.post('admin/add_mentor', payload)
        return reponse
    } catch (error) {
        return error.reponse
    }
}
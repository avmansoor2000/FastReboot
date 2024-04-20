import instance from "./instance"

export const Audios = async(payload)=>{
     try {
        const response = instance.post('admin/add_audio',payload);
        return response
     } catch (error) {
        return error.response
     }
}
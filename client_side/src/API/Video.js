import instance from "./instance"

export const GetVideos = async(payload) =>{
    try {
        const response = await instance.post('admin/add_video',payload)
        return response
    } catch (error) {
        return error.response
    }
}

export const AddVideo = async(payload) =>{
    try {
        const response = await instance.get('admin/get_videos',payload)
        return response
    } catch (error) {
        return error.response
    }
}


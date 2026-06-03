import API from './client'

export const postApi={
    createPost:(postData)=>API.post('posts',postData),
    getUserPosts:(userID)=>API.get(`/posts/user/${userId}`),
}
export default postApi;
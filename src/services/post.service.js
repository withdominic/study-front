import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/v1/posts/";

class PostService {
  setPostUpdate(posts) {
    return axios.put(
      API_URL + posts.id,
      {
        title: posts.title,
        content: posts.content
      },
      { headers: authHeader() }
    );
  }

  setPostAdd(posts) {
    return axios.post(
      API_URL,
      {
        title: posts.title,
        content: posts.content,
        author: posts.author
      },
      { headers: authHeader() }
    );
  }
}

export default new PostService();

const API_KEY = `32445976-19b17560e96f7fd808d7c3843`;

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const response = await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`
    );
    const imageDataResp = await response.json();
    this.page += 1;
    return imageDataResp;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

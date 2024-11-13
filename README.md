# 📖 Best Sellers Books App

The Best Sellers Books App is a React and TypeScript-based application that utilizes the New York Times Best Sellers Books API to display and explore the top-selling books across various genres.

## 📝 Features

- View All Bestseller Lists: Discover the current best-selling books across all genres, curated by the New York Times, with the top 5 titles highlighted and organized by genre.
- Filter Bestseller Lists by Time Period: Customize your view by time updated, with options to filter by weekly or monthly top-seller lists, all organized by genre.
- Bestseller List Details: Dive deeper into each genre-specific bestseller list, displaying books ranked in order from top to bottom.
- Caching Mechanism: Book data is cached and refreshed weekly, ensuring fast access and synchronization with the latest NYT updates. This also optimizes API usage by reducing unnecessary requests, improving performance, and managing API limits.

## 🔧 Technology Used

- React & TypeScript: Frontend framework and language for building a reliable and efficient interface.
- [Chakra UI](https://www.chakra-ui.com/): A modular and customizable component library for React that provides accessible and responsive design elements.
- [Vitest](https://vitest.dev/): A testing framework ensuring the reliability and quality of the application.
- Cache Management (Local Storage): Efficiently caches data to reduce API requests and improve performance.
- [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/): Tools for enforcing consistent coding style and best practices, helping to maintain high-quality, readable code.
- [New York Times Books API](https://developer.nytimes.com/docs/books-product/1/overview): Real-time API that provides information about book reviews and The New York Times Best Sellers lists.

## 📊 Project Structure

- src/router: Contains the routing logic of the application, managing navigation between pages.
- src/components: Stores reusable UI components, all built with Chakra UI.
- src/utils: Includes utility functions, test helpers, and additional features such as the "scroll to top" button for smoother navigation.
- src/services: Handles API interactions, centralizing functions responsible for making requests and processing external data.
- src/pages: Contains the main page components, such as Home, BookListDetails, and NotFound.

## 🖥️ Local development

#### Clone the repo:

```shell
git clone git@github.com:letbueno/best-sellers-books-app.git
```

#### Copy the .env.example to a .env file
This project uses the New York Times Books API to fetch real-time best sellers books data. To access the API, you need to obtain an API key from the [New York Times Books API](https://developer.nytimes.com/docs/books-product/1/overview). Once you have your API key, copy the .env.example file to .env to configure your local environment:

```shell
cp .env.example .env
```

In the **.env** file, replace YOUR_API_KEY with your actual API key:

```
REACT_APP_API_KEY=YOUR_API_KEY
```

### Install the application:

```shell
yarn install
```

### Start the app:

```shell
yarn start
```

## 🧪 Test

For running the test suite

```shell
yarn test
```

## 🎨 Code linting

To check the code quality, use the following command:

```shell
yarn lint
```


interface IItem {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}

export const fetchItems = () =>
  new Promise<IItem[]>((resolve, reject) => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });

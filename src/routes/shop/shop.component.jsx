import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useDispatch } from "react-redux";
import { setCategoriesMap } from "../../store/category/category.action";

const Shop = () => {
  const disptach = useDispatch()
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      disptach(setCategoriesMap(categoriesMap));
    };
    getCategoriesMap();
  }, []);
  
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

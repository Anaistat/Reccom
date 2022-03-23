import React, {createContext} from "react";
import {Product} from "../types";

type EditReviewCtx = {
    product: Product | undefined
    setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>
}

const EditReviewContext = createContext<EditReviewCtx>({
    product: undefined,
    setProduct: () => {}
})

export default EditReviewContext
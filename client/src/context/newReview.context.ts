import React, {createContext} from "react";
import {Product} from "../types";

type NewReviewCtx = {
    product: Product | undefined
    setProduct: React.Dispatch<React.SetStateAction<Product | undefined>>
}

const NewReviewContext = createContext<NewReviewCtx>({
    product: undefined,
    setProduct: () => {}
})

export default NewReviewContext
import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const CreatePage = () => {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        if (name === "" || quantity === 0 || price === 0 || image === "") {
            toast.error('Please fill out all input completely');
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post(`${VITE_BACKEND_URL}/product`, {name: name, quantity: quantity, price: price, image: image});
            toast.success(`Save ${response.data.name} sucessfully`);
            setIsLoading(false);
            navigate('/')
        } catch (error) {
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">
                Create a Product
            </h2>
            <form onSubmit={saveProduct}>
                <div className="space-y-2">
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"/>
                    </div>
                    <div>
                        <label>Quantity</label>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Enter quantity" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"/>
                    </div>
                    <div>
                        <label>Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"/>
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter url for image" className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"/>
                    </div>
                    <div>
                        { !isLoading && ( <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button> )}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePage
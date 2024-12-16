import React, { useState } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { IoMdArrowUp } from "react-icons/io";
import { IoArrowDown } from "react-icons/io5";
import { LuArrowDownUp } from "react-icons/lu";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface Product {
    name: string;
    price: number;
    quantity: number;
}

declare module 'jspdf' {
    interface jsPDF {
        autoTable(options: {
            startY?: number;
            head: string[][];
            body: any[][];
        }): jsPDF;
    }
}

declare module 'jspdf-autotable' {
    interface AutoTableOptions {
        didDrawCell?: (data: {
            cell: {
                y: number;
                height: number;
            };
        }) => void;
    }  
}

const AddProduct: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState<number | ''>('');
    const [productQuantity, setProductQuantity] = useState<number | ''>('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Product | null, direction: 'asc' | 'desc' | null }>({ key: null, direction: null });
    const user = useSelector((state: RootState) => state.auth.user);

    const handleAddProduct = () => {
        if (productName && productPrice !== '' && productQuantity !== '') {
            setProducts([
                ...products,
                {
                    name: productName,
                    price: Number(productPrice),
                    quantity: Number(productQuantity),
                },
            ]);
            setProductName('');
            setProductPrice('');
            setProductQuantity('');
        }
    };

    type SortDirection = 'asc' | 'desc' | null;

    const sortProducts = (key: keyof Product) => {
        let direction: SortDirection = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedProducts = [...products].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setProducts(sortedProducts);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleString();
        const companyName = 'Levitation Infotech';
        const travellerName = user.username;
        const email = user.email;

        doc.setFontSize(24);
        doc.text('INVOICE GENERATOR', 70, 15);
        doc.setFontSize(16);
        doc.text('Sample Output should be this', 75, 25);
        doc.addImage('/logo.png', 'PNG', 10, 10, 30, 30);
        doc.setFontSize(12);
        doc.text(`Company: ${companyName}`, 10, 50);
        doc.text(`Traveller: ${travellerName}`, 10, 60);
        doc.text(`Email: ${email}`, 10, 70);
        doc.text(`Date: ${currentDate}`, 10, 80);

        const tableColumn = ['Product', 'Qty', 'Rate', 'Total Amount'];
        const tableRows: Array<any> = [];

        products.forEach((product) => {
            const productData = [
                product.name,
                product.quantity.toString(),
                product.price.toFixed(2),
                (product.price * product.quantity).toFixed(2),
            ];
            tableRows.push(productData);
        });
        let lastY = 90;
        doc.autoTable({
            startY: lastY,
            head: [tableColumn],
            body: tableRows,
            
        });
        const totalPrice: number = calculateTotal();
        doc.setFontSize(12);
        doc.text(`Total Charges: INR ${totalPrice.toFixed(2)}`, 10, lastY + 10);
        doc.text(`GST (18%): INR ${(totalPrice * 0.18).toFixed(2)}`, 10, lastY + 20);
        doc.text(`Total Amount: INR ${(totalPrice * 1.18).toFixed(2)}`, 10, lastY + 30);

        doc.text(`Date: ${currentDate}`, 10, lastY + 40);
        doc.setFontSize(10);
        doc.text('We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.', 10, lastY + 50);

        doc.save('invoice.pdf');
    };







    const calculateTotal = (): number => {
        return products.reduce((total, product) => {
            return total + (product.price + product.price * 0.18) * product.quantity;
        }, 0);
    };


    return (
        <div className="h-full bg-black text-white">
            <div className="w-full lg:w-[80%] mx-auto py-12 px-4">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">Add Products</h2>
                <p className="mb-6 text-[#868886] text-lg lg:text-xl">
                    This is basic login page which is used for levitation <span className="line-clamp-2">assignment purpose.</span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    <div>
                        <h1>Product Name</h1>
                        <input
                            type="text"
                            placeholder="Enter the product name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="bg-[#282928] border-[#6d776d] mt-2 border p-2 rounded w-full text-white placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <h1>Product Price</h1>
                        <input
                            type="number"
                            placeholder="Enter the price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(Number(e.target.value))}
                            className="bg-[#282928] border-[#6d776d] mt-2 border p-2 rounded w-full text-white placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <h1>Quantity</h1>
                        <input
                            type="number"
                            placeholder="Enter the Qty"
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(Number(e.target.value))}
                            className="bg-[#282928] border-[#6d776d] mt-2 border p-2 rounded w-full text-white placeholder-gray-500"
                        />
                    </div>
                </div>

                <button
                    onClick={handleAddProduct}
                    className="bg-[#343c34] text-[#b2fb3b] py-2 px-4 rounded flex justify-center items-center gap-2 w-full md:w-auto"
                >
                    Add Product <FiPlusCircle />
                </button>

                <div className="mt-8 overflow-x-auto">
                    <table className="w-full rounded border-x border-[#6d776d] min-w-[600px]">
                        <thead>
                            <tr className="text-left bg-white text-black">
                                <th className="py-2 px-4 cursor-pointer" onClick={() => sortProducts('name')}>
                                    <h1 className="flex items-center gap-1">
                                        Product Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? <IoMdArrowUp /> : <IoArrowDown />) : <LuArrowDownUp />}
                                    </h1>
                                </th>
                                <th className="py-2 px-4 cursor-pointer" onClick={() => sortProducts('quantity')}>
                                    <h1 className="flex items-center gap-1">
                                        Quantity {sortConfig.key === 'quantity' ? (sortConfig.direction === 'asc' ? <IoMdArrowUp /> : <IoArrowDown />) : <LuArrowDownUp />}
                                    </h1>
                                </th>
                                <th className="py-2 px-4">Price</th>
                                <th className="py-2 px-4">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-400 border-b border-[#6d776d]">
                                        No products added yet.
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {products.map((product, index) => (
                                        <tr key={index} className="border-t border-gray-700">
                                            <td className="py-2 px-4">({product.name})</td>
                                            <td className="py-2 px-4">{product.quantity}</td>
                                            <td className="py-2 px-4">INR {product.price}</td>
                                            <td className="py-2 px-4">INR {(product.price * product.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    <tr className="border-y border-[#6d776d]">
                                        <td className="py-2 px-4 text-right" colSpan={3}>+GST 18%</td>
                                        <td className="py-2 px-4">INR {calculateTotal()}</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                    <div className="mt-6 flex justify-center items-center">
                        <button
                            onClick={generatePDF}
                            className="bg-[#343c34] text-[#b2fb3b] py-2 px-16 rounded w-full md:w-auto"
                        >
                            Generate PDF Invoice
                        </button>
                    </div>
                </div>
            </div>
            <div className="absolute top-[10%] right-[50%] backgroundstyle shadow-[10px_10px_300px_100px_violet]"></div>
        </div>
    );
};

export default AddProduct;

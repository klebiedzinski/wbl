import styles from './Produkty.module.scss';
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import axiosInstance from '../../config/axios_config';
import { AiFillDelete } from 'react-icons/ai';
const Produkty = () => {
    const { data: produkty, isLoading, error } = useFetch('/products');
    const {data: raport, isLoading: isLoadingRaport, error: errorRaport} = useFetch('/products/report');

    const [product, setProduct] = useState({
        nazwa: "",
        cena: "",
        ilosc: "",
        kategoria: "",
        jednostka_miary: ""
      });

      const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
      };

      const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance.post("/products", product)
        .then((res) => {
            console.log(res);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
        setProduct({
            nazwa: "",
            cena: "",
            ilosc: "",
            kategoria: "",
            jednostka_miary: ""
        });

      };

      const handleDelete = (id) => {
        axiosInstance.delete(`/products/${id}`)
        .then((res) => {
            console.log(res);
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
        };
        

    return ( 
        <div>
            <h1>Produkty - wszystkie posty </h1>
            <h2>Juz do ui nie dawalem tego geta z sortowaniem ale mozna sobie zerknac w przegladarce</h2>
            <h2>wbl.klebiedzinski.pl/api/products/*pole przez ktore mamy sortowac*/*order sortowania*/*ilosc do wyswietlenia*</h2>
            <h2>Prooosze o 8pkt prosze prosze prosze</h2>
            {error && <div>{error}</div>}
            {isLoading && <div>Ładowanie...</div>}
            {produkty &&  (
                <>
                <div className={styles.produkty}>
                <table>
                    <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Cena</th>
                            <th>Ilość</th>
                            <th>Kategoria</th>
                            <th>Jednostka miary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produkty.map((produkt) => (
                            <>
                            <tr key={produkt._id}>
                                <td>{produkt.nazwa}</td>
                                <td>{produkt.cena}</td>
                                <td>{produkt.ilosc}</td>
                                <td>{produkt.kategoria}</td>
                                <td>{produkt.jednostka_miary}</td>
                                 <td onClick={() => handleDelete(produkt._id)}> <AiFillDelete/> </td>
                            </tr>
                            </>
                        ))}
                    </tbody>
                </table>
                </div>
                
                <div className={styles.report}>
                <h1>Raport</h1>
                {errorRaport && <div>{errorRaport}</div>}
                {isLoadingRaport && <div>Ładowanie...</div>}
                {raport && (
                    <table>
                        <thead>
                            <tr>
                                <th>Kategoria</th>
                                <th>Łączna ilość</th>
                                <th>Łączna wartość</th>
                            </tr>
                        </thead>
                        <tbody>
                            {raport.map((raport) => (
                                <tr key={raport._id}>
                                    <td>{raport._id}</td>
                                    <td>{raport.lacznaIlosc}</td>
                                    <td>{raport.laczna_wartosc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                </div>

                <div className={styles.Produkty}>
                <h1>Dodaj produkt</h1>
                 <form onSubmit={handleSubmit}>
                    <label>
                        Nazwa:
                        <input
                        type="text"
                        name="nazwa"
                        value={product.nazwa}
                        onChange={handleChange}
                        required
                        />
                    </label>
                    <label>
                        Cena:
                        <input
                        type="number"
                        name="cena"
                        value={product.cena}
                        onChange={handleChange}
                        required
                        />
                    </label>
                    <label>
                        Ilość:
                        <input
                        type="number"
                        name="ilosc"
                        value={product.ilosc}
                        onChange={handleChange}
                        required
                        />
                    </label>
                    <label>
                        Kategoria:
                        <input
                        type="text"
                        name="kategoria"
                        value={product.kategoria}
                        onChange={handleChange}
                        required
                        />
                    </label>
                    <label>
                        Jednostka miary:
                        <input
                        type="text"
                        name="jednostka_miary"
                        value={product.jednostka_miary}
                        onChange={handleChange}
                        required
                        />
                    </label>
                    <button type="submit">Dodaj produkt</button>
                    </form>

                </div>
            </>
            )}
        </div>
     );
}
 
export default Produkty;
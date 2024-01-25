import { useRouter } from "next/navigation";
import { useState } from "react";


const Search = () => {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = `${process.env.BASE_URL}/app/blogs/?search=${searchText}`;
            const res = await fetch(apiUrl);

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const result = await res.json();

            router.push(`/blog?search=${searchText}`);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="search-bx">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        name="text"
                        type="text"
                        className="form-control"
                        placeholder="Write your text"
                        value={searchText}
                        onChange={handleChange}
                    />
                    <span className="input-group-btn">
                        <button type="submit" className="site-button">
                            <i className="fa fa-search"></i>
                        </button>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Search;

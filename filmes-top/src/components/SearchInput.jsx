import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";

import "./Navbar.css";

const SearchInput = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const Genrer = [
        { "genres": [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }] }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!search) return;

        navigate(`/search?q=${search}`, { replace: true });
        setSearch("");
    };

    return (
        <nav id="navbar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Busque uma Categoria"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                />
                <button type="submit">
                    <BiSearchAlt2 />
                </button>
            </form>

        </nav>
    );
};

export default SearchInput;

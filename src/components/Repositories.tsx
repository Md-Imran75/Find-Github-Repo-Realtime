import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type Repository = {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
};

const Repositories = ({ keyword }: { keyword: string }) => {
    const getRepositories = async () => {
        const response = await axios.get<{ items: Repository[] }>(
            `https://api.github.com/search/repositories?q=${keyword}`
        );
        return response.data.items;
    };

    const { isLoading, isError, data } = useQuery({
        queryKey: ['repositories', keyword],
        queryFn: getRepositories,
        enabled: !!keyword, // Ensures the query only runs when keyword is provided
    });

    return (
        <>
            {isLoading && keyword ? <div>Loading...</div> : ''}
            {isError && <div>Error found...</div>}
            {data &&
                data.map((repo) => (
                    <div className='md:w-[500px] mt-2 w-full mx-5 p-4 text-white bg-slate-600 text-sm rounded-lg' key={repo.id}>
                        Repo Name: <span className='text-yellow-500 uppercase font-bold'> {repo.name} </span> <br />
                        Repo Full Name: {repo.full_name} <br />
                        Repo URL: <a className='hover:text-yellow-500' href={repo.html_url}>{repo.html_url}</a>
                    </div>
                ))}
        </>
    );
};

export default Repositories;

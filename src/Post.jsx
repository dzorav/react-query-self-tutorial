import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import PostDetails from './PostDetails'

const maxPostPage = 3

async function fetchPosts(pageNum) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${maxPostPage}&_page=${pageNum}`)
    const data = response.json()
    return data
}

const Post = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPost, setSelectedPost] = useState(null)

    const queryClient = useQueryClient()

    const { data, isLoading, isFetching, isError, error } = useQuery(["posts", currentPage], () => fetchPosts(currentPage), {
        keepPreviousData: true
    })

    useEffect(() => {

        if (currentPage < maxPostPage) {
            const nextPage = currentPage + 1;
            queryClient.prefetchQuery(
                ["posts", nextPage],
                () => fetchPosts(nextPage)
            )
        }

    }, [currentPage, queryClient])

    console.log({ data })
    // 
    if (isLoading) return "Loading..."
    // 
    // if (isFetching) return "Fetching..."

    if (isError) return <div>{JSON.stringify(error.message)}</div>

    return (

        <>

            <ul>
                {
                    data && data.map(item => {
                        return (
                            <li key={item.id} style={{ marginBottom: "20px" }}>
                                <button
                                    onClick={() => setSelectedPost(item)}
                                >{item.title.toUpperCase()}</button><br />
                                {/* <PostDetails key={item.id} item={item} /> */}
                            </li>
                        )
                    })

                }
            </ul>
            <hr />
            <div className='pages'>
                <button
                    disabled={currentPage < 1}
                    onClick={() => {
                        setCurrentPage(currentPage - 1)
                    }}
                >Previous Page</button>
                <span>Page {currentPage + 1}</span>
                <button
                    disabled={currentPage >= 10}
                    onClick={() => {
                        setCurrentPage(currentPage + 1)
                    }}
                >Next Page</button>
            </div>
            <hr />
            {
                selectedPost && <PostDetails post={selectedPost} />
            }
        </>
    )
}

export default Post
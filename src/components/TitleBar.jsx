import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {  SortDown } from "react-bootstrap-icons";
import axios from 'axios';
import back from "../assets/back.png";

const usePathname = () => {
    const location = useLocation();
    return location.pathname;
}

function TitleBar({ item, afterChange, addActivity, setSortValue, sortValue }) {
    const [path, setPath] = useState()
    const [editTitle, setEditTitle] = useState(false)
    const [title, setTitle] = useState('')

    const currentPath = usePathname().substring((usePathname().lastIndexOf("/")
    ) + 1)

    const sortOption = [
        {
            label: "Terbaru",
            value: "terbaru",
            icon: "bx bx-sort-down",
        },
        {
            label: "Terlama",
            value: "terlama",
            icon: "bx bx-sort-up",
        },
        {
            label: "A-Z",
            value: "a_z",
            icon: "bx bx-sort-a-z",
        },
        {
            label: "Z-A",
            value: "z_a",
            icon: "bx bx-sort-z-a",
        },
        {
            label: "Belum Selesai",
            value: "belum_selesai",
            icon: "bx bx-sort-alt-2",
        },
    ]


    const focusTitle = () => {
        setEditTitle(!editTitle);
        setTitle(item.title)
        setTimeout(() => {
            document.getElementById("item-title").focus();
        }, 1);
        return
    }

    const editTitleActivity = async (e) => {
        e.preventDefault()
        const request = {
            title: title,
        }
        const headers = {
            "Content-Type": "application/json",
        }
        await axios.patch(`https://todo.api.devcode.gethired.id/activity-groups/${item.id}`, request, headers)
        await afterChange()
        setEditTitle(false);
        return
    }

    useEffect(() => {
        setPath(currentPath)
        if (path) {
            document.title = "Detail"
        } else {
            document.title = "Activity"
        }


    }, [path])

    return (
        <>
            <div className="flex justify-between items-center w-full">
                {path == false ?
                    <>
                        <h1 className="font-bold text-3xl" data-cy="activity-title">Activity</h1>
                        <button
                            className="btn btn-primary gap-2  font-semibold text-base normal-case px-3 lg:px-5"
                            type="button"
                            data-cy="activity-add-button"
                            onClick={addActivity}
                        >
                            <i className='bx bx-plus bx-sm'></i>
                            <span className="hidden lg:block"> Tambah </span>
                        </button>
                    </>
                    : <>
                        {item == undefined ?
                            <></> :
                            <>
                                <div className='inline-flex items-center gap-3 lg:gap-4'>
                                    <Link to={`/`}>
                                    <img src={back} alt="" className="w-8" />
                                    </Link>
                                    {editTitle ?
                                        <input
                                            type="text"
                                            id="item-title"
                                            className="bg-transparent border-b-2 font-bold text-2xl w-full"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            onBlur={editTitleActivity}
                                            
                                        />
                                        :
                                        <h1 className="font-bold text-2xl lg:text-3xl cursor-pointer"
                                            data-cy="todo-title"
                                            onClick={() => focusTitle()}
                                        >
                                            {item.title}
                                        </h1>

                                    }
                                    <button type="button" className='pt-1' onClick={() => focusTitle()}>
                                       ????
                                    </button>
                                </div>
                                <div className='inline-flex items-center gap-3 lg:gap-4'>
                                    <div className="dropdown dropdown-end">
                                        <label
                                            tabIndex={0}
                                            className="btn bg-sky-500 hover:bg-sky-600 border-none gap-2 h-2 font-semibold text-base normal-case px-6 lg:px-5 rounded-full"
                                            data-cy="todo-sort-button"
                                        >
                                           <SortDown size={30} color={"white"} />
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-md w-52">
                                            {sortOption.map((sortItem) => (
                                                <li
                                                    key={sortItem.value}
                                                    className={sortValue == sortItem.value ? "bordered" : ""}
                                                    onClick={() => {
                                                        setSortValue(sortItem.value);
                                                        document.activeElement.blur();
                                                    }}
                                                    data-cy="sort-selection">
                                                    <a>
                                                        <i className={sortItem.icon}></i>
                                                        {sortItem.label}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <label
                                        className="btn btn-primary gap-2  font-semibold text-base normal-case px-3 lg:px-5"
                                        type="button"
                                        data-cy="todo-add-button"
                                        htmlFor="my-modal-2"
                                    >
                                        <i className='bx bx-plus bx-sm'></i>
                                        <span className="hidden lg:block"> Tambah </span>
                                    </label>
                                </div>
                            </>
                        }
                    </>
                }
            </div >
        </>
    )
}

export default TitleBar
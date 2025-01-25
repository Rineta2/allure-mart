import React from 'react'

export default function ProductContent() {
    return (
        <section className='p-4'>
            <div className="container">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className='text-2xl font-bold'>Daftar Produk</h1>
                        <p className='text-sm text-gray-500'>Daftar semua produk yang sudah terdaftar</p>

                        <label className="input input-bordered flex items-center gap-2 mt-2">
                            <input type="text" className="grow" placeholder="Cari Produk..." />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="btn btn-primary hover:bg-primary/80">Tambah Produk</button>
                    </div>
                </div>
            </div>
        </section>
    )
}
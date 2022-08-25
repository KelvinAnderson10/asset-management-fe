import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { useDeps } from '../../shared/context/DependencyContext'
import './Overview.css'
import { OverviewColumn } from './OverviewColumn'
import { BsArrowDownUp } from 'react-icons/bs'

export const Overview = () => {
  const {overviewService} = useDeps();
  const [datas, setDatas] = useState([]);
  const [order, setOrder] = useState('ASC')
  const [rowData, setRowData] = useState([]);
  const [viewShow, setViewShow] = useState();
  const [asset, setAsset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const areAllFieldsFilled = asset !== "";
 
  const handleChangeAsset = (e) => {
    const newData = {...asset}
    newData[e.target.name] = e.target.value
    setAsset(newData)
    console.log(newData)
  }

  const handleViewShow = () => {
    setViewShow(true);
  }

  const handleViewClose = () => {
    setViewShow(false)
  }

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  //CRUD
  //Get All
  const onGetAllAsset = async () => {
    try {
        const response = await overviewService.getAllAsset();
        setDatas(response.data);
        console.log(response);
    } catch (e) {
        console.log(e);
    } 
  }

  useEffect(() => {
      onGetAllAsset();
  }, []);

  //Pagination
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i=1; i<= Math.ceil(datas.length/itemPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem)

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  //Sorting
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...datas].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setDatas(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...datas].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setDatas(sorted);
      setOrder("ASC");
    }
  };

  const sortingNum = (col) => {
    if (order === "ASC") {
        const sorted = [...datas].sort((a, b) =>
          a[col] > b[col] ? 1 : -1
        );
        setDatas(sorted);
        setOrder("DSC");
      }
      if (order === "DSC") {
        const sorted = [...datas].sort((a, b) =>
          a[col] < b[col] ? 1 : -1
        );
        setDatas(sorted);
        setOrder("ASC");
      }
  }

  //GetById
   const [size, setSize] = useState(400);
   const [bgColor, setBgColor] = useState("ffffff");

  const handleGetAssetById= async (name) => {
    setLoading(true)
    try {
        const response = await overviewService.getAssetByAssetName(name);
        setRowData(response.data)
        setViewShow(true)
    } catch (e) {
        console.log(e);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
        <Sidebar/>
        <div className='overview-container'>
          <div className='overview-card'>
            <div className='overview-box'>
            <table className='table table-bordered table-striped table-responsive table-hover'>
                <thead className='table-header'>
                  <tr>
                      <th style={{minWidth: "100px"}}>Action</th>
                      <th style={{minWidth: "200px"}}>Tanggal Pembelian</th>
                      <th style={{minWidth: "200px"}}>Tahun</th>
                      <th style={{minWidth: "200px"}}>No. PO / Dokumenen Pendukung</th>
                      <th style={{minWidth: "200px"}}>Vendor</th>
                      <th style={{minWidth: "300px"}}>Nama Barang</th>
                      <th style={{minWidth: "200px"}}>Harga Perolehan</th>
                      <th style={{minWidth: "200px"}}>PPN</th>
                      <th style={{minWidth: "200px"}}>Biaya Lain-Lain</th>
                      <th style={{minWidth: "200px"}}>Total Harga Perolehan</th>
                      <th style={{minWidth: "200px"}}>Jenis Produk</th>
                      <th style={{minWidth: "200px"}}>Kategori Jenis Produk</th>
                      <th style={{minWidth: "200px"}}>Kategori Aset Tetap</th>
                      <th style={{minWidth: "200px"}}>BAST Output</th>
                      <th style={{minWidth: "200px"}}>BAST</th>
                      <th style={{minWidth: "200px"}}>Kondisi</th>
                      <th style={{minWidth: "200px"}}>Insurance</th>
                      <th style={{minWidth: "200px"}}>Lokasi</th>
                      <th style={{minWidth: "200px"}}>User</th>
                      <th style={{minWidth: "200px"}}>Jabatan</th>
                      <th style={{minWidth: "200px"}}>Initisal</th>
                      <th style={{minWidth: "200px"}}>Kode Wilayah</th>
                      <th style={{minWidth: "200px"}}>Kode Asset</th>
                      <th style={{minWidth: "200px"}}>Tahun Pembelian</th>
                      <th style={{minWidth: "200px"}}>Kode Urut barang</th>
                      <th style={{minWidth: "200px"}}>Nomor Asset</th>
                      <th style={{minWidth: "200px"}}>Masa Manfaat (Bulan)</th>
                      <th style={{minWidth: "200px"}}>Penyusutan Perbulan</th>
                      <th style={{minWidth: "200px"}}>Total Bulan Penyusutan</th>
                      <th style={{minWidth: "200px"}}>Total Penyusutan</th>
                      <th style={{minWidth: "200px"}}>Nilai Asset saat ini</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.length === 0 ? (
                    <tr>No data found</tr>
                  ): (currentItems.map((data) => (
                    <tr key={data['Nomor Asset']}>
                      <th>
                            <a
                              onClick={() => {
                                handleViewShow(setRowData(data));
                              }}
                              className="view"
                              data-toggle="modal"
                              style={{ cursor: "pointer"} }
                            >
                              <i
                                className="material-icons"
                                data-toggle="tooltip"
                                title="View"
                              >
                                &#xe8f4;
                              </i>
                            </a>
                            <a target="_blank" href={`http://api.qrserver.com/v1/create-qr-code/?data=Nomor Asset: ${data['Nomor Asset']}%0A Asset Name: ${data['Nama Barang']}%0A Asset Category: ${data['Kategori Jenis Produk']}%0A Product Name: ${data['Jenis Produk']}%0A Location: ${data['Lokasi']}%0A No PO: ${data['No. PO / Dokumenen Pendukung']}&size=${size}x${size}&bgcolor=${bgColor}`} download="QRCode">
                            <i
                                className="material-icons"
                                data-toggle="tooltip"
                                title="View"
                              >
                                &#xf090;
                              </i>
                            </a>
                            {/* <a
                              onClick={() => {
                                handleEditShow(rowData['Nomor Asset'], data);
                              }}
                              className="edit"
                              data-toggle="modal"
                              style={{ cursor: "pointer" }}
                            >
                              <i
                                className="material-icons"
                                data-toggle="tooltip"
                                title="Edit"
                              >
                                &#xe3c9;
                              </i>
                            </a> */}
                      </th>
                      <td>{data['Tanggal Output']}</td>
                      <td>{data['Tanggal Pembelian']}</td>
                      <td>{data['Tahun']}</td>
                      <td>{data['No. PO / Dokumenen Pendukung']}</td>
                      <td>{data['Vendor']}</td>
                      <td>{data['Nama Barang']}</td>
                      <td>{data['Harga Perolehan']}</td>
                      <td>{data['PPN']}</td>
                      <td>{data['Biaya Lain-Lain']}</td>
                      <td>{data['Total Harga Perolehan']}</td>
                      <td>{data['Jenis Produk']}</td>
                      <td>{data['Kategori Jenis Produk']}</td>
                      <td>{data['Kategori Aset Tetap']}</td>
                      <td>{data['BAST Output']}</td>
                      <td>{data['BAST']}</td>
                      <td>{data['Kondisi']}</td>
                      <td>{data['Insurance']}</td>
                      <td>{data['Lokasi']}</td>
                      <td>{data['Jabatan']}</td>
                      <td>{data['Initial']}</td>
                      <td>{data['Kode Wilayah']}</td>
                      <td>{data['Kode Asset']}</td>
                      <td>{data['Tahun Pembelian']}</td>
                      <td>{data['Kode Urut barang']}</td>
                      <td>{data['Nomor Asset']}</td>
                      <td>{data['Masa Manfaat (Bulan)']}</td>
                      <td>{data['Penyusutan Perbulan']}</td>
                      <td>{data['Total Bulan Penyusutan']}</td>
                      <td>{data['Total Penyusutan']}</td>
                      <td>{data['Nilai Asset saat ini']}</td>
                    </tr>
                  )))}
                </tbody>
              </table>
              </div>
              <div className='clearfix'>
                <div className='hint-text'>
                  Showing <b> {itemPerPage} </b> out of <b>{datas.length}</b>{" "} enteries
                </div>
                </div>
                <ul className='pageNumbers'>
                  <li>
                    <button onClick={handlePrevbtn} disabled={currentPage==pages[0] ? true : false}>Prev</button>
                  </li>
                  {pageDecrementBtn}
                  {renderPageNumbers}
                  {pageIncrementBtn}
                  <li>
                    <button onClick={handleNextbtn} disabled={currentPage==pages[pages.length -1] ? true : false}>Next</button>
                  </li>
                </ul>
            </div>
          </div>
          <div className="model-box-view">
          <Modal
            show={viewShow}
            onHide={handleViewClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>View Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className="form-group">
                  <label>No Asset</label>
                  <input
                    type="text"
                    className="form-control"
                    value={rowData['Nomor Asset']}
                    readOnly
                  />
                  <label>Asset Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={rowData['Nama Barang']}
                    readOnly
                  />
                  <label>Asset Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={rowData['Kategori Aset Tetap']}
                    readOnly
                  />
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={rowData['Kategori Jenis Produk']}
                    readOnly
                  />
                  <label>Subproduct Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={rowData['Jenis Produk']}
                    readOnly
                  />
                  <label>No PO</label>
                  <input
                    type="text"
                    className="form-control"
                    value={rowData['No. PO / Dokumenen Pendukung']}
                    readOnly
                  />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleViewClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    </>
    
  )
}

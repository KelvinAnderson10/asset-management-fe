import React, { useEffect, useState } from "react";
import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../../shared/context/DependencyContext";
import moment from "moment";
import ReactPaginate from "react-paginate";
import "./TableAssetDep.css";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ExportToExcel } from "../../../shared/components/ExportExcel/ExportToExcel";
import { CSVLink, CSVDownload } from "react-csv";
import json2csv from "json2csv";

export const TableAssetDeprecated = () => {
  const [datas, setDatas] = useState([]);
  const { dashboardService } = useDeps();
  const [pageCount, setPageCount] = useState(0);
  const [totalAsset, setTotalAsset] = useState(0);

  const [page, setPage] = useState();
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    onGetAssetAlmostDeprecated(currentPage);
  };

  const thousands_separators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };

  const onGetAssetAlmostDeprecated = async (page) => {
    try {
      const response = await dashboardService.getAssetAlmostDeprecated(page);
      setPage(page);
      for (let i in response.data) {
        response.data[i]["Harga Perolehan"] =
          "Rp" + thousands_separators(response.data[i]["Harga Perolehan"]);
        response.data[i]["Biaya Lain-Lain"] =
          "Rp" + thousands_separators(response.data[i]["Biaya Lain-Lain"]);
        response.data[i]["PPN"] =
          "Rp" + thousands_separators(response.data[i]["PPN"]);
        response.data[i]["Penyusutan Perbulan"] =
          "Rp" + thousands_separators(response.data[i]["Penyusutan Perbulan"]);
        response.data[i]["Total Harga Perolehan"] =
          "Rp" +
          thousands_separators(response.data[i]["Total Harga Perolehan"]);
        response.data[i]["Total Penyusutan"] =
          "Rp" + thousands_separators(response.data[i]["Total Penyusutan"]);
        response.data[i]["Nilai Asset saat ini"] =
          "Rp" + thousands_separators(response.data[i]["Nilai Asset saat ini"]);
        response.data[i]["Tanggal Output"] = moment(
          response.data[i]["Tanggal Output"]
        ).format("YYYY-MM-DDTHH:MM");
        response.data[i]["BAST Output"] = moment(
          response.data[i]["BAST Output"]
        ).format("YYYY-MM-DDTHH:MM");
      }
      setDatas(response.data);
      setTotalAsset(response.count);
      setPageCount(Math.ceil(response.count / 10));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    onGetAssetAlmostDeprecated(1);
    onGetAllAssetAlmostDeprecated();
  }, []);

  const [header, setHeader] = useState([])
  const [allAsset, setAllAsset] = useState([]);
  const onGetAllAssetAlmostDeprecated = async () => {
    try {
      const response = await dashboardService.getAllDeprecated();
      console.log("ini response all", response.data);
      setHeader([
        { label: "Tanggal Pembelian", key: "Tanggal Output" },
        { label: "Tahun", key: "Tahun" },
        { label: "No. PO / Dokumen Pendukung", key: "No. PO / Dokumenen Pendukung" },
        { label: "Vendor", key: "Vendor" },
        { label: "Nama Barang", key: "Nama Barang" },
        { label: "Harga Perolehan", key: "Harga Perolehan" },
        { label: "PPN", key: "PPN" },
        { label: "Biaya Lain-Lain", key: "Biaya Lain-Lain" },
        { label: "Total Harga Perolehan", key: "Total Harga Perolehan" },
        { label: "Jenis Produk", key: "Jenis Produk" },
        { label: "Kategori Jenis Produk", key: "Kategori Jenis Produk" },
        { label: "Kategori Aset Tetap", key: "Kategori Aset Tetap" },
        { label: "BAST", key: "BAST Output" },
        { label: "Kondisi", key: "Kondisi" },
        { label: "Insurance", key: "Insurance" },
        { label: "Lokasi", key: "Lokasi" },
        { label: "User", key: "User"},
        { label: "Jabatan", key: "Jabatan" },
        { label: "Initisal", key: "Initisal" },
        { label: "Kode Wilayah", key: "Kode Wilayah" },
        { label: "Kode Asset", key: "Kode Asset" },
        { label: "Tahun Pembelian", key: "Tahun Pembelian" },
        { label: "Kode Urut barang", key: "Kode Urut barang" },
        { label: "Nomor Asset", key: "Nomor Asset" },
        { label: "Masa Manfaat (Bulan)", key: "Masa Manfaat (Bulan)" },
        { label: "Penyusutan Perbulan", key: "Penyusutan Perbulan" },
        { label: "Total Bulan Penyusutan", key: "Total Bulan Penyusutan" },
        { label: "Total Penyusutan", key: "Tanggal Output" },
        { label: "Nilai Asset saat ini", key: "Nilai Asset saat ini" },
        { label: "Tipe", key: "Tipe" },
        
    ])
      setAllAsset(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const navigate = useNavigate();
  const onClickBack = () => {
    navigate("/main", { replace: true });
  };

  console.log("ini header", header);

  return (
    <div>
      <Sidebar>
        <div className="overview-container-deprecated">
          <div className="overview-card-deprecated">
            <div className="title-deprecated">
              <MdIcons.MdOutlineArrowBackIosNew
                color="black"
                onClick={onClickBack}
                style={{ cursor: "pointer", marginRight: "5px" }}
              />
              List Asset Almost Deprecated
              <div className="download-excel">
                <CSVLink
                  data={allAsset}
                  headers={header}
                  filename={"asset-almost-deprecated.csv"}
                  className="btn btn-primary"
                >
                  Download here
                </CSVLink>
              </div>
            </div>
            <div className="pagination-deprecated">
              <div className="clearfix">
                Showing {datas.length} out of {totalAsset}
              </div>
              <div style={{ marginRight: "2vw", marginTop: "1vh" }}>
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                />
              </div>
            </div>

            <div className="table-container">
              <div className="table-box">
                <table className="table table-bordered table-striped table-responsive table-hover">
                  <thead className="table-header">
                    <tr>
                      <th>No</th>
                      <th style={{ minWidth: "200px" }}>Purchase Date</th>
                      <th style={{ minWidth: "200px" }}>Year</th>
                      <th style={{ minWidth: "200px" }}>PO Number</th>
                      <th style={{ minWidth: "200px" }}>Vendor Name</th>
                      <th style={{ minWidth: "300px" }}>Item Name</th>
                      <th style={{ minWidth: "230px" }}>Acquisition Cost </th>
                      <th style={{ minWidth: "200px" }}>PPN</th>
                      <th style={{ minWidth: "200px" }}>Additional Cost </th>
                      <th style={{ minWidth: "270px" }}>
                        Total Acquisition Cost{" "}
                      </th>
                      <th style={{ minWidth: "220px" }}>Subproduct Name </th>
                      <th style={{ minWidth: "200px" }}>Product Name</th>
                      <th style={{ minWidth: "200px" }}>Asset Category </th>
                      <th style={{ minWidth: "200px" }}>BAST</th>
                      <th style={{ minWidth: "200px" }}>Condition</th>
                      <th style={{ minWidth: "200px" }}>Insurance</th>
                      <th style={{ minWidth: "200px" }}>Location</th>
                      <th style={{ minWidth: "200px" }}>User</th>
                      <th style={{ minWidth: "200px" }}>Position</th>
                      <th style={{ minWidth: "200px" }}>Initial</th>
                      <th style={{ minWidth: "200px" }}>Location ID</th>
                      <th style={{ minWidth: "200px" }}>Product Code</th>
                      <th style={{ minWidth: "200px" }}>Purchase Year </th>
                      <th style={{ minWidth: "220px" }}>Item Order Code </th>
                      <th style={{ minWidth: "200px" }}>Asset Number</th>
                      <th style={{ minWidth: "200px" }}>Useful Life</th>
                      <th style={{ minWidth: "250px" }}>
                        Monthly Depreciation{" "}
                      </th>
                      <th style={{ minWidth: "240px" }}>Depreciation Month </th>
                      <th style={{ minWidth: "230px" }}>Total Depreciation </th>
                      <th style={{ minWidth: "240px" }}>
                        Current Asset Value{" "}
                      </th>
                      <th style={{ minWidth: "240px" }}>Tracking Number </th>
                      <th style={{ minWidth: "240px" }}>Type </th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.length === 0 ? (
                      <tr>
                        <th colSpan="31">Data is not found</th>
                      </tr>
                    ) : (
                      datas.map((data, index) => (
                        <tr key={data["Nomor Asset"]}>
                          <th>{index + 1}</th>
                          <td>{data["Tanggal Output"]}</td>
                          <td>{data["Tahun"]}</td>
                          <td>{data["No. PO / Dokumenen Pendukung"]}</td>
                          <td>{data["Vendor"]}</td>
                          <td>{data["Nama Barang"]}</td>
                          <td>{data["Harga Perolehan"]}</td>
                          <td>{data["PPN"]}</td>
                          <td>{data["Biaya Lain-Lain"]}</td>
                          <td>{data["Total Harga Perolehan"]}</td>
                          <td>{data["Jenis Produk"]}</td>
                          <td>{data["Kategori Jenis Produk"]}</td>
                          <td>{data["Kategori Aset Tetap"]}</td>
                          <td>{data["BAST Output"]}</td>
                          <td>{data["Kondisi"]}</td>
                          <td>{data["Insurance"]}</td>
                          <td>{data["Lokasi"]}</td>
                          <td>{data["User"]}</td>
                          <td>{data["Jabatan"]}</td>
                          <td>{data["Initisal"]}</td>
                          <td>{data["Kode Wilayah"]}</td>
                          <td>{data["Kode Asset"]}</td>
                          <td>{data["Tahun Pembelian"]}</td>
                          <td>{data["Kode Urut barang"]}</td>
                          <td>{data["Nomor Asset"]}</td>
                          <td>{data["Masa Manfaat (Bulan)"]}</td>
                          <td>{data["Penyusutan Perbulan"]}</td>
                          <td>{data["Total Bulan Penyusutan"]}</td>
                          <td>{data["Total Penyusutan"]}</td>
                          <td>{data["Nilai Asset saat ini"]}</td>
                          <td>{data["Nomor Resi"]}</td>
                          <td>{data.Tipe}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import * as XLSX from "xlsx";
import { useDeps } from "../../shared/context/DependencyContext";
import "./ImportData.css";
import guidelines from "../../assets/file/guidelines.xlsx";
import template from "../../assets/file/template.xlsx";

import { Success } from "../../shared/components/Notification/Success";
import { Failed } from "../../shared/components/Notification/Failed";
import UploadLoading from "../../shared/components/Loading/UploadLoading";
import Loading from "../../shared/components/Loading/Loading";
import { EVENT } from "../../shared/constants";
import { useAuth } from "../../services/UseAuth";

export const ImportData = () => {
  const [excelData, setExcelData] = useState([]);
  const [doneUploadExcel, setDoneUploadExcel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingscd, setIsLoadingscd] = useState(false);
  const [uploadBackendData, setUploadBackendData] = useState([]);
  const [upload, setUpload] = useState(true);
  const [fileName, setFileName]= useState('No file chosen')

  const { assetItemService, eventLogService } = useDeps();

  const handleSubmit = async () => {
    setUpload(false);
    setIsLoadingscd(true);

    try {
      const response = await assetItemService.batchInsert(uploadBackendData);
      Success("uploaded");
      let event = {
        event: EVENT.IMPORT_DATA,
        user: user.name,
      };
      createEventImportData(event);
    } catch (error) {
      if (error.response.data.error.Detail) {
        Failed(`Upload failed because ${error.response.data.error.Detail}`);
      } else if (error.response.data.error.Field) {
        Failed(
          `Upload failed because column ${error.response.data.error.Field} is in wrong format`
        );
      } else {
        Failed(
          `Upload failed because one of data in subproduct column doesn't exist`
        );
      }
      console.log(error);
      
    } finally {
      setIsLoadingscd(false);
      setUpload(true);
    }
  };

  const convertExcelDate = (excelDate) => {
    let date = new Date(Math.round((excelDate - (25567 + 2)) * 86400 * 1000));
    let convertedDate = date.toISOString().split("T")[0];
    return convertedDate;
  };

  const readUploadFile = (e) => {
    e.preventDefault();
    setFileName(e.target.files[0].name)
    
    if (e.target.files[0]) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Sheetnya, misal produk berarti di index ke 2
        const worksheet = workbook.Sheets[sheetName];
        let json = XLSX.utils.sheet_to_json(worksheet);
        console.log(json);
        // Notes : yang dikirim ke backend tetap const json, const excelData hanya untuk tampilan
        setExcelData(json);

        setUploadBackendData(json);
        e.target.files = null;
        setIsLoading(false);
        setUpload(false);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }

  };

  useEffect(() => {
    setDoneUploadExcel(true);
    setIsLoading(false);
    setIsLoadingscd(false);
    
  }, [excelData]);

  //Event Log
  const [event, setEvent] = useState({});

  const createEventImportData = async (eventLoc) => {
    try {
      const response = await eventLogService.createEventLog(eventLoc);
      setEvent(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //Get User
  const { getCookie } = useAuth();
  const [user, setUser] = useState({
    name: "",
    position: "",
    role: "",
    NIK: "",
  });
  const onGetCookie = () => {
    let savedUserJsonString = getCookie("user");
    let savedUser = JSON.parse(savedUserJsonString);
    setUser((prevObj) => ({
      ...prevObj,
      NIK: savedUser.NIK,
      name: savedUser.name,
      position: savedUser.position,
      role: savedUser.role,
    }));

    console.log(user.name);
  };

  useEffect(() => {
    onGetCookie();
  }, []);

  document.querySelector("body").style.overflow = "auto";

  return (
    <>
      <Sidebar>
        <div>
          <div className="body">
            <div className="container">
              <div className="title-container">
                <h4>Add Multiple Asset</h4>
              </div>
              <div className="form-upload-container">
                <div className="choose-file">
                <input accept=".xlsx" onChange={readUploadFile} type="file" id="actual-btn" hidden/>
                <label for="actual-btn">Choose File</label>
                <span  id="file-chosen">{fileName}</span>
                </div>

                <button className="download-excel">
                  <a href={guidelines} download="Upload Guidelines.xlsx">
                    Download Guidelines
                  </a>
                </button>
                <button className="download-excel">
                  <a href={template} download="Template.xlsx">
                    Download Template
                  </a>
                </button>
              </div>
              {/* <div className='download-excel'>
              
            </div>  */}
              <div className="note">
                <h5>Notes</h5>
                <div className="content-note">
                  <ul>
                    <li>
                      1. Any date format should be customize as 'd-mmmm-y'
                      format.
                    </li>
                    <li>
                      2. Fields such as Harga Perolehan, PPN and Biaya Lain-Lain
                      should be in 'Number' format.
                    </li>
                    <li>
                      3. Some fields are mandatory. (Download 'Upload
                      Guidelines' or 'Template' above for more information).
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="import-box">
                  <br></br>
                  {/* <h3>
                          Upload <b>Assets</b>
                      </h3> */}
                  <div className="table-responsive">
                    <div className="table-import-wrapper">
                      <div className="">
                        <div className="row">
                          <div className="col-xs-8"></div>
                        </div>
                      </div>

                      <table className="table table-striped table-hover">
                        <thead className="table-secondary">
                          <tr>
                            <th>Tanggal Pembelian</th>
                            <th>Tahun</th>
                            <th>No. PO / Dokumenen Pendukung</th>
                            <th>Vendor</th>
                            <th style={{ minWidth: "300px" }}>Nama Barang</th>
                            <th>Harga Perolehan</th>
                            <th>PPN</th>
                            <th>Biaya Lain-Lain</th>
                            <th>Total Harga Perolehan</th>
                            <th>Jenis Produk</th>
                            <th>Kategori Jenis Produk</th>
                            <th>Kategori Aset Tetap</th>
                            <th>BAST</th>
                            <th>Kondisi</th>
                            <th>Insurance</th>
                            <th>Lokasi</th>
                            <th>User</th>
                            <th>Jabatan</th>
                            <th>Initisal</th>
                            <th>Kode Wilayah</th>
                            <th>Kode Asset</th>
                            <th>Tahun Pembelian</th>
                            <th>Kode Urut barang</th>
                            <th>Nomor Asset</th>
                            <th>Masa Manfaat (Bulan)</th>
                            <th>Penyusutan Perbulan</th>
                            <th>Total Bulan Penyusutan</th>
                            <th>Total Penyusutan</th>
                            <th>Nilai Asset saat ini</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doneUploadExcel &&
                            excelData.map((item, index) => {
                              return (
                                <tr key={item["Nomor Asset"]}>
                                  <td>
                                    {item["Tanggal Pembelian"] &&
                                      convertExcelDate(
                                        item["Tanggal Pembelian"]
                                      )}
                                  </td>
                                  <td>{item["Tahun"]}</td>
                                  <td>
                                    {item["No. PO / Dokumenen Pendukung"]}
                                  </td>
                                  <td>{item["Vendor"]}</td>
                                  <td style={{ minWidth: "300px" }}>
                                    {item["Nama Barang"]}
                                  </td>
                                  <td>{item["Harga Perolehan"]}</td>
                                  <td>{item["PPN"]}</td>
                                  <td>{item["Biaya Lain-Lain"]}</td>
                                  <td>{item["Total Harga Perolehan"]}</td>
                                  <td>{item["Jenis Produk"]}</td>
                                  <td>{item["Kategori Jenis Produk"]}</td>
                                  <td>{item["Kategori Aset Tetap"]}</td>
                                  <td>
                                    {item["BAST"] &&
                                      convertExcelDate(item["BAST"])}
                                  </td>
                                  <td>{item["Kondisi"]}</td>
                                  <td>{item["Insurance"]}</td>
                                  <td>{item["Lokasi"]}</td>
                                  <td>{item["User"]}</td>
                                  <td>{item["Jabatan"]}</td>
                                  <td>{item["Initisal"]}</td>
                                  <td>{item["Kode Wilayah"]}</td>
                                  <td>{item["Kode Asset"]}</td>
                                  <td>{item["Tahun Pembelian"]}</td>
                                  <td>{item["Kode Urut barang"]}</td>
                                  <td>{item["Nomor Asset"]}</td>
                                  <td>{item["Masa Manfaat (Bulan)"]}</td>
                                  <td>{item["Penyusutan Perbulan"]}</td>
                                  <td>{item["Total Bulan Penyusutan"]}</td>
                                  <td>{item["Total Penyusutan"]}</td>
                                  <td>{item["Nilai Asset saat ini"]}</td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="button-save">
                    <button
                      disabled={upload}
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isLoading && <Loading />}
          {isLoadingscd && <UploadLoading />}
        </div>
      </Sidebar>
    </>
  );
};

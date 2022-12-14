import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import { Failed } from "../../shared/components/Notification/Failed";
import moment from "moment";
import "./AssetItem.css";

import { EVENT } from "../../shared/constants";
import { useAuth } from "../../services/UseAuth";
import imageCompression from "browser-image-compression";
import AssetItemLoading from "../../shared/components/Loading/AssetItemLoad";
import swal from "sweetalert";

export const AssetItem = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [imageBase64, setImageBase64] = useState("");
  let reader = new FileReader();
  const [subProductName, setSubProductName] = useState([]);
  const { assetItemService, vendorService, locationService, eventLogService } =
    useDeps();
  const ref = useRef(null);
  const [fileName, setFileName] = useState("No file chosen");

  useEffect(() => {
    onGetAllSubProduct();
    onGetAllVendor();
    onGetAllLocation();
    onGetCookie();
  }, []);
  // GET ALL SUBPRODUCT NAME
  const onGetAllSubProduct = async () => {
    try {
      const response = await assetItemService.getAllAsset();

      setSubProductName(response.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  // GET ALL VENDOR
  const [vendor, setVendor] = useState([]);

  const onGetAllVendor = async () => {
    try {
      const response = await vendorService.getAllVendor();

      setVendor(response.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  // GET ALL LOCATIONS
  const [locations, setLocations] = useState([]);
  const onGetAllLocation = async () => {
    try {
      const response = await locationService.getAllLocation();

      setLocations(response.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const imageChange = async (e) => {
    setFileName(e.target.files[0].name);
    if (e.target.files && e.target.files.length > 0) {
      const imageFiles = e.target.files[0];

      const options = {
        maxSizeMB: 0.5,
        // maxWidthOrHeight: 200,
        useWebWorker: true,
      };
      try {
        const compressedImage = await imageCompression(imageFiles, options);
        setSelectedImage(compressedImage);
        reader.readAsDataURL(compressedImage);
        reader.onload = () => {
          setImageBase64(reader.result);
        };
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
    ref.current.value = "";
  };

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    document.querySelector("body").style.overflow = "hidden";
    try {
      data["Harga Perolehan"] = Number(data["Harga Perolehan"]);
      data["Kode Wilayah"] = Number(data["Kode Wilayah"]);
      data["Kode Urut barang"] = Number(data["Kode Urut barang"]);
      data["Biaya Lain-Lain"] = Number(data["Biaya Lain-Lain"]);
      data["BAST Output"] = moment(data["BAST Output"]).format();
      data["Tanggal Output"] = moment(data["Tanggal Output"]).format();
      data["Asset Image"] = imageBase64;
      data["PPN"] = Number(data["PPN"]);

      const response = await assetItemService.createAsset(data);
      setData(response.data);

      swal({
        title: "Success!",
        text: "Your data has been saved!",
        icon: "success",
        button: "OK!",
      });

      let event = {
        event: EVENT.CREATE_ASSET,
        user: user.name,
      };
      createEventLogAssetItem(event);
      document.querySelector("body").style.overflow = "auto";

      clearForm();
    } catch (error) {
      console.log(error.response);
      Failed(error.response.data.error.Detail);
    } finally {
      e.target.reset();
      setIsLoading(false);
      
    }
  };

  const clearForm = () => {
    setData({});
    setSelectedImage();
    setFileName('No file choosen')
  };

  // EVENT LOG
  const [event, setEvent] = useState({});
  const createEventLogAssetItem = async (eventLoc) => {
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
    role: "",
    level_approval: "",
    location_id: "",
    tap: "",
    cluster: "",
    department: "",
  });
  const onGetCookie = () => {
    let savedUserJsonString = getCookie("user");
    let savedUser = JSON.parse(savedUserJsonString);
    setUser((prevObj) => ({
      ...prevObj,
      name: savedUser.name,
      role: savedUser.role,
      level_approval: savedUser.level_approval,
      location_id: savedUser.location_id,
      tap: savedUser.TAP,
      cluster: savedUser.Cluster,
      department: savedUser.department,
    }));
  };

  document.querySelector("body").style.overflow = "hidden";

  return (
    <>
      <Sidebar style={{ overflow: "hidden" }}>
        <div className="import-box">
          <div className="asset-container">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="row">
                <div className="col">
                  <h3 className="title">Add Asset Item</h3>

                  <div id="input" className="inputBox">
                    <span>Asset Name :</span>
                    <input
                      type="text"
                      required
                      name="Nama Barang"
                      value={data["Nama Barang"]}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    />
                  </div>
                  <div className="inputBox">
                    <span>Subproduct Name :</span>
                    <select
                      required
                      name="Jenis Produk"
                      value={data["Jenis Produk"]}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    >
                      <option value="">Select Subproduct</option>
                      {subProductName.map((item) => (
                        <option
                          key={item.subproduct_name}
                          value={item.subproduct_name}
                        >
                          {item.subproduct_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="inputBox">
                    <span>Vendor :</span>
                    <select
                      required
                      name="Vendor"
                      value={data.Vendor}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    >
                      <option value="">Select Vendor</option>

                      {vendor.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="inputBox">
                    <span>Location :</span>
                    <select
                      required
                      name="Kode Wilayah"
                      value={data["Kode Wilayah"]}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    >
                      <option value="">Select Location</option>
                      {locations.map((item, index) => (
                        <option
                          key={item["kode wilayah"]}
                          value={item["kode wilayah"]}
                        >
                          {item.location}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="inputBox">
                    <span>Condition :</span>
                    <select
                      required
                      name="Kondisi"
                      value={data.Kondisi}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    >
                      <option value="">Select Condition</option>
                      <option>Baik</option>
                      <option>Rusak</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="inputBox">
                    <span>PO Number :</span>
                    <input
                      type="text"
                      required
                      name="No. PO / Dokumenen Pendukung"
                      value={data["No. PO / Dokumenen Pendukung"]}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    />
                  </div>
                  <div className="inputBox">
                    <span>Purchase Date (mm/dd/yyyy, hh:mm AM/PM) :</span>
                    <input
                      type="datetime-local"
                      required
                      name="Tanggal Output"
                      value={data["Tanggal Output"]}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    />
                  </div>
                  <div className="inputBox">
                    <span>BAST (mm/dd/yyyy, hh:mm AM/PM) :</span>
                    <input
                      type="datetime-local"
                      required
                      name="BAST Output"
                      value={data["BAST Output"]}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    />
                  </div>
                  <div className="inputBox">
                    <span>Purchase Price :</span>
                    <input
                      min="0"
                      type="number"
                      required
                      name="Harga Perolehan"
                      value={data["Harga Perolehan"]}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="asset-image-container">
                    <div className="image-box">
                      {selectedImage && (
                        <div className="image">
                          {" "}
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            className="image"
                            alt="Thumb"
                            style={{ width: "200px", height: "140px" }}
                          />
                          <button
                            onClick={removeSelectedImage}
                            className="cancel"
                          >
                            Remove the image
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="choose-file">
                      <input
                        ref={ref}
                        accept="image/*"
                        onChange={imageChange}
                        type="file"
                        id="actual-btn"
                        hidden
                      />
                      <label for="actual-btn">Choose File</label>
                      <span id="file-chosen">{fileName}</span>
                    </div>
                  </div>
                  <div className="inputBox">
                    <span>Additional Cost :</span>
                    <input
                      min="0"
                      type="number"
                      required
                      name="Biaya Lain-Lain"
                      value={data["Biaya Lain-Lain"]}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    />
                  </div>
                  <div className="inputBox">
                    <span>Insurance</span>
                    <select
                      required
                      name="Insurance"
                      value={data.Insurance}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    >
                      <option value="">Select</option>
                      <option>Sudah</option>
                      <option>Belum</option>
                    </select>
                  </div>
                  <div className="inputBox">
                    <span>User :</span>
                    <input
                      type="text"
                      required
                      name="User"
                      value={data.User}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    />
                  </div>
                  <div className="inputBox">
                    <span>Position :</span>
                    <input
                      type="text"
                      required
                      name="Jabatan"
                      value={data.Jabatan}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    />
                  </div>
                  <div className="inputBox">
                    <span>Tracking Number:</span>
                    <input
                      type="string"
                      required
                      name="Nomor Resi"
                      value={data["Nomor Resi"]}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    />
                  </div>
                  <div className="inputBox">
                    <span>PPN :</span>
                    <select
                      required
                      name="PPN"
                      value={data.PPN}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                    >
                      <option value="">Select Condition</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                  </div>
                  <div className="button-asset">
                    <a href="#input">
                      <button
                        type="submit"
                        className="btn btn-primary button-submit"
                      >
                        Submit
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Sidebar>
      {isLoading && <AssetItemLoading />}
    </>
  );
};

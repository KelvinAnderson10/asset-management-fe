import React from 'react'
import "./GeneratePdf.css"
import Header from "../../../assets/images/Header.png"
import Footer from "../../../assets/images/Footer.png"
import { useState } from 'react';
import gambar from "../../../assets/images/no-data.png"

export const GeneratePdf = () => {
    const [coba, setCoba] = useState(true)
    const Attachment = [
        {"name": "a", "picture": "a"},
        {"name": "b", "picture": "b"},
        {"name": "c", "picture": "c"},
        {"name": "d", "picture": "d"},
        {"name": "e", "picture": "e"},
        {"name": "f", "picture": "f"},
        {"name": "g", "picture": "g"},
        {"name": "h", "picture": "h"},
    ]
    const iterateAttachment = (Attachment) => {
            return (
                <div>
                    <img id="img-header" src={Header} width="20cm"></img>
                        {Attachment.name}
                        {Attachment.picture}
                    <img id="img-footer" src={Footer} width="20cm"></img>
                </div>
            )
    }

    return (
        <div className="PDF">
            <img id="img-header" src={Header} width="20cm"></img>
            <div className="pdf-body">
                <a style={{fontSize: 14}}>INTERNAL MEMO</a>
                <table style={{borderCollapse: "collapse", lineHeight: '18px', fontSize:14}}>
                    <tr>
                        <td>Nomor</td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </td>
                    </tr>
                    <tr>
                        <td>Tanggal</td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </td>
                    </tr>
                    <tr>
                        <td>Kepada</td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: - Bp. Bernard Martian
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Bp. Bernard
                            Martian </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Bp. Bernard
                            Martian </td>
                    </tr>
                    <tr>
                        <td>Dari</td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </td>
                        <td> </td>
                    </tr>
                    <tr>
                        <td>Perihal</td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </td>
                    </tr>
                    <tr style={{borderBottom: "2pt solid black", borderColor: "black", lineHeight: 1}}>
                        <td>&nbsp;</td>
                        <td style={{width: "100%"}}>
                        </td>
                    </tr>
                    <tr style={{lineHeight: 2}}>
                        <td><b>TUJUAN</b></td>
                        <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Mendapatkan Persetujuan
                            Sewa</td>
                    </tr>
                </table>
                    <p style={{marginTop: "0.5%", fontSize:14}}><b>LATAR BELAKANG:</b><br/>
                    Pengajuan ini disampaikan dengan pertimbangan sebagai berikut :
                    <ol type="1" style={{lineHeight: "16px", textAlign: "justify", marginTop: "1%"}}>
                        <li>Akan berakhirnya kontrak kerjasama sewa antara PT. Narindo Solusi Telekomunikasi dengan Bpk Syahrir
                            Tauhid untuk sewa Tempat TAP Sekayu pada tanggal 01 November 2022.</li>
                        <li>Masih dibutuhkannya ruangan kerja untuk kantor TAP Sekayu, maka dari itu kami memohon izin untuk
                            Pengajuan Sewa Baru Gedung TAP Sekayu</li>
                    </ol>
                    </p>
                    <p style={{lineHeight: "16px", textAlign: "justify", marginTop: "0%", fontSize:14}}>
                        <b>USULAN PERSETUJUAN</b><br/>
                        Berdasarkan latar belakang di atas, dengan ini kami mengajukan permohonan persetujuan management untuk
                        pengajuan Sewa Baru Gedung TAP Sekayu selama <b>1 Tahun</b> dengan rincian sebagai berikut :
                        <table style={{marginLeft: "4%", borderCollapse: "collapse", marginBottom: "1%", textAlign: 'left', marginTop: "1%"}}>
                            <tr>
                                <td><b>1.</b></td>
                                <td><b>Lokasi Gedung</b></td>
                                <td>: </td>
                                <td>&nbsp;Jl. Kol. Wahid Udin No 559 F Sekayu Kab. Musi Banyuasin</td>
                            </tr>
                            <tr>
                                <td><b>2.</b></td>
                                <td><b>Jumlah Lantai</b></td>
                                <td>: </td>
                                <td>&nbsp;1 Ruko 2 Lantai</td>
                            </tr>
                            <tr>
                                <td><b>3.</b></td>
                                <td><b>Daya Listrik</b></td>
                                <td>: </td>
                                <td>&nbsp;5.500 Watt</td>
                            </tr>
                            <tr>
                                <td><b>4.</b></td>
                                <td><b>Periode Sewa</b></td>
                                <td>: </td>
                                <td>&nbsp;01 November 2022 s.d 30 Oktober 2023</td>
                            </tr>
                            <tr>
                                <td><b>5.</b></td>
                                <td><b>Biaya Sewa</b></td>
                                <td>: </td>
                                <td>&nbsp;Rp 42.500.000,- / 1 Tahun (Nominal yang ditransfer ke pemilik)</td>
                            </tr>
                            <tr style={{verticalAlign: 'top'}}>
                                <td><b>6.</b></td>
                                <td><b>Pajak 4 Ayat 2</b></td>
                                <td>: </td>
                                <td>&nbsp;Rp 4.250.000,- (Pajak ditanggung PT. Narindo Solusi Telekomunikasi)</td>
                            </tr>
                            <tr>
                                <td><b>7.</b></td>
                                <td style={{width: '150px'}}><b>Besar Beban Sewa</b></td>
                                <td>: </td>
                                <td>&nbsp;Rp 46.750.000,- / 1 Tahun </td>
                            </tr>
                            <tr>
                                <td><b>8.</b></td>
                                <td><b>Pembayaran</b></td>
                                <td>: </td>
                                <td>&nbsp;Transfer ke rek SUMSEL BABEL dengan</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>&nbsp;No. Rek 1400.123.867 a.n SYAHRIR TAUHID IR.H.MM</td>
                            </tr>
                            <tr>
                                <td><b>9.</b></td>
                                <td><b>Batas Waktu</b></td>
                                <td>: </td>
                                <td>&nbsp;31 Oktober 2022</td>
                            </tr>
                            <tr>
                                <td><b>10.</b></td>
                                <td><b>Alasan</b></td>
                                <td>: </td>
                                <td>&nbsp;31 Oktober 2022</td>
                            </tr>
                        </table>
                        Demikian permohonan ini kami sampaikan, dan atas persetujuan yang diberikan kami ucapkan terima kasih.
                    </p>
                    <table style={{width: "100%", borderCollapse: "collapse", fontSize:14, marginBottom: 180}}>
                        <tr>
                            <th style={{fontWeight: "normal", textAlign: "left", width: "5cm"}}>Sekayu, 24 Oktober 2022</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td style={{textAlign: "left"}}>Diajukan oleh,</td>
                            <td colspan="2" style={{textAlign: "center"}}>Mengetahui,</td>
                            <td style={{textAlign: "left"}}>Disetujui oleh,</td>
                        </tr>
                        <tr>
                            <td style={{lineHeight: "2cm", }}>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td><b><u>Arief Budiman</u></b></td>
                            <td>&nbsp;<b><u>Josephat Christian</u></b></td>
                            <td><b><u>Ridwan Syahman</u></b></td>
                            <td><b><u>Bernard Martian</u></b></td>
                        </tr>
                        <tr>
                            <td style={{width: "30%"}}><b>GM Regional SBP</b></td>
                            <td>&nbsp;<b>Director Of Sales</b></td>
                            <td><b>Chief Of Finance</b></td>
                            <td><b>Chief Of Executive</b></td>
                        </tr>
                    </table>
            </div>
            <div>

            </div>
            <img id="img-footer" src={Footer} width="20cm"></img>
            {Attachment.map((item)=>{
                console.log(item);
                // iterateAttachment(item)
                return(
                    <>
                        <div style={{height: "10%"}}>
                            <img id="img-header" src={Header} width="20cm"></img>
                        </div>
                        <div style={{height: "80%"}}>
                            {item.name}
                            {item.picture}
                            <img src={gambar} width="100%"></img>
                        </div>
                        <div style={{height: "10%", marginTop: "100px"}}>
                            <img id="img-footer" src={Footer} width="20cm"></img>
                        </div>
                    </>
                )
            })}

            <div style={{paddingTop: "5%", margin: "1.5cm"}} >
                <table width={"100%"} style={{border: "3px solid black"}}>
                    <tr style={{textAlign: 'center', fontWeight:'bold', fontSize: 20}}>FORMULIR PENGAJUAN BIAYA SEWA</tr>
                </table>

                <p style={{marginTop: "0.3cm", marginBottom: "0.3cm", fontSize: 12}}>TANGGAL&nbsp;: passing data createdAt</p>
                <table width={"100%"} style={{border: "1px solid black", fontSize: 12}} >
                    <tr>
                        <th style={{border: "1px solid black", textAlign: 'center', width: "5%"}}>NO</th>
                        <th style={{border: "1px solid black", textAlign: 'center', width: "32%"}}>KETERANGAN</th>
                        <th style={{border: "1px solid black", textAlign: 'center'}}>&nbsp;</th>
                        <th style={{border: "1px solid black", textAlign: 'center'}}>WAJIB DIISI</th>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>1</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>REGIONAL</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>Sumbagsel</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>2</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>CABANG</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>Sumbagsel</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>3</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>CLUSTER</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>Musi</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>4</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>ALAMAT LOKASI</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>Jl. dimana</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>&nbsp;</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>Lanjutan Alamat</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>5</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>JENIS TEMPAT (RUKO / RUMAH)</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>jenisnya</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>6</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>FASILITAS YANG ADA : TELEPON : </td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>&nbsp;</td>
                        <td style={{border: "1px solid black", paddingLeft: "4cm"}}>PLN : </td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>&nbsp;</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>plnnya</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>&nbsp;</td>
                        <td style={{border: "1px solid black", paddingLeft: "4cm"}}>PAM :</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>&nbsp;</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>pdamnya</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>7</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>LAIN - LAIN</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>8</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>MASA SEWA (BULAN / TAHUN)</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>pdata</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>9</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>PERIODE SEWA</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}> 1 nov</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>10</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>NAMA PEMILIK</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>pemilik</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>11</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>NPWP</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>eifhwe</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>12</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>ALAMAT PEMILIK</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>alamat pe</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>13</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>NO TELEPON PEMILIK</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>849354</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>14</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>HARGA SEWA / TAHUN (Harga Lama)</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>Rp 1000</td>
                    </tr><tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>15 </td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>HARGA SEWA / TAHUN (Harga Baru)</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>Rp 1000</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>16</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>PPh</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>Pph dibayar penyewa</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>17</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>NAMA REKENING PEMILIK</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>namanya</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>&nbsp;</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>NOMOR REKENING PEMILIK</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>123</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>&nbsp;</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>BANK</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>passing</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>&nbsp;</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>CABANG</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>cabang</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>18</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>CARA PMEBAYARAN</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>TRANSFER</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black", textAlign: "center"}}>19</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>TANGGAL JATUH TEMPO</td>
                        <td style={{border: "1px solid black", textAlign: "center"}}>:</td>
                        <td style={{border: "1px solid black", paddingLeft: "0.1cm"}}>31 Oktober</td>
                    </tr>
                    <tr>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                        <td style={{border: "1px solid black"}}>&nbsp;</td>
                    </tr>
                </table>

                <div style={{paddingTop: "0.3cm"}}>
                    <table width={"100%"} >
                        <tr style={{fontSize:12}}>Musi Banyuasin, 24 Okt</tr>
                    </table>
                </div>

                <div style={{paddingTop: "0.3cm"}}>
                    <table width={"100%"}>
                        <tr>
                            <td style={{fontSize: 12, fontWeight: 'bold', textAlign:"center"}}>Dibuat Oleh,</td>
                            <td style={{fontSize: 12, fontWeight: 'bold', textAlign:"center"}}>Diketahui Oleh,</td>
                            <td style={{fontSize: 12, fontWeight: 'bold', textAlign:"center"}}>Menyetujui</td>
                        </tr>
                        <tr>
                            <td style={{lineHeight: "2cm"}}>&nbsp;</td>
                            <td style={{lineHeight: "2cm"}}>&nbsp;</td>
                            <td style={{lineHeight: "2cm"}}>&nbsp;</td>
                        </tr>
                        <tr>
                            <td style={{fontSize: 12, fontWeight: 'bold', textAlign:"center"}}>AAAA</td>
                            <td style={{fontSize: 12, fontWeight: 'bold', textAlign:"center"}}>BBBB</td>
                            <td style={{fontSize: 12, fontWeight: 'bold', textAlign:"center"}}>CCCC</td>
                        </tr>
                        <tr>
                            <td style={{fontSize: 12, fontWeight: 'bold', textAlign:"center"}}>Jabatan1</td>
                            <td style={{fontSize: 12, fontWeight: 'bold', textAlign:"center"}}>Jabatan1</td>
                            <td style={{fontSize: 12, fontWeight: 'bold', textAlign:"center"}}>Jabatan1</td>
                        </tr>
                    </table>
                </div>



            </div>
        </div>
    )
}

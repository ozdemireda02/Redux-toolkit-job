import { useNavigate } from "react-router-dom";
import { statusOpt, typeOpt } from "../constants";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slices/jobSlice";
import axios from "axios";
import { toast } from 'react-toastify';
import { setJobs } from "../redux/slices/jobSlice";
import { setError } from "../redux/slices/jobSlice";
import { setLoading } from "../redux/slices/jobSlice";
import { useEffect } from "react";


const AddJob = () => {
  
  const state = useSelector((store) => store.jobSlice)
  const navigate = useNavigate();
  const dispatch = useDispatch();

   // api'den verileri alıp store'a aktarır
   const fetchData = () => {

    // 1.yüklenme durumunu güncelle
    dispatch(setLoading());

    axios
      .get("http://localhost:4500/jobs")

      // 2.veri gelirse store'a aktar
      .then((res) => dispatch(setJobs(res.data)))

      // 3.hata olursa store'u güncelle
      .catch(() => dispatch(setError()));
  }

  useEffect(() => {
    fetchData();
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    // inputlardan verileri alma
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // select alanlarını kontrol et
    // if(!data.type || !data.status){
    //   return toast.info("Lütfen durum ve tür alanlarını doldurunuz...")
    // }

    // işe id ve oluşturma tarihi ekle
    data.id = v4();
    data.date = new Date().toLocaleDateString();

    // hem api'ye hem store'a işi ekle
    axios.post("http://localhost:4500/jobs",data)
    .then(() => {
     navigate("/");
     dispatch(createJob(data));
     toast.success("Ekleme İşlemi Başarılı");
    });

    // bütün formu sıfırlar
    e.target.reset();
  
  }

  return (
    <div className="add-page">
      <section className="add-section">
        <h2>Yeni İş Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="position" name="position" type="text" required />
            {/* otomatik tamamlama kısmı için */}
            <datalist id="position" >
              {state.jobs.map((job) => (
                  <option value={job.position}/>
              ))}
            </datalist>

          </div>
          <div>
            <label>Şirket</label>
            <input list="companies" name="company" type="text" required />
            <datalist id="companies" >
              {state.jobs.map((job) => (
                  <option value={job.company}/>
              ))}
            </datalist>
          </div>
          <div>
            <label>Lokasyon</label>
            <input list="local" name="location" type="text" required />
            <datalist id="local" >
              {state.jobs.map((job) => (
                  <option value={job.location}/>
              ))}
            </datalist>
          </div>
          <div>
            <label>Durum</label>
            <select name="status" required>
              <option value={''} hidden>Seçiniz</option>
              {statusOpt.map((i) => {
                return <option>{i}</option>;
              })}
            </select>
          </div>
          <div>
            <label>Tür</label>
            <select name="type" required>
              <option value={''} hidden>Seçiniz</option>
              {typeOpt.map((i) => {
                return <option>{i}</option>;
              })}
            </select>
          </div>
          <div>
            <button className="add-button" type="submit">
              <span class="button_top"> Ekle</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;

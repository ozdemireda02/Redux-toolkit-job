import React, { useEffect, useState } from 'react'
import { sortsOpt, typeOpt } from '../constants';
import { statusOpt } from '../constants';
import { useDispatch } from 'react-redux';
import { clearFilters, filterbySearch } from '../redux/slices/jobSlice';
import { sortJobs } from '../redux/slices/jobSlice';

const Filter = ( {jobs} ) => {
    const dispatch = useDispatch();
    const [text,setText] = useState("")

    // bu şekilde kullandığımız zaman her tuş vuruşunda filtreleme yapar
    // bu gereksiz filtrelemeler performans sorunu yaratır
    // yapmamız gereken yazma işlemini kestiğinde bir kere action tetiklenmeli.

    useEffect(() => {
    // bir sayaç başlat,işlemi sayaç durunca yap
    const timer = setTimeout(() => dispatch(filterbySearch({field:"company",text})),500);
    // eğerki süre bitmeden tekrar useEffect çalışırsa önceki sayacı sıfırla
    // state her değiştiğinde return çalışıyor
    return () => clearTimeout(timer);
    },[text]);

  return (

        <section className="filter-section">
        <h2>Filtreleme Formu</h2>
        <form >
          <div>
            <label>Şirket İsmine Göre Ara</label>
            <input onChange={(e) => setText(e.target.value)} list="positions" name="position" type="text"  />
            {/* otomatik tamamlama kısmı için */}
            <datalist id="positions" >
              {jobs.map((job) => (
                  <option value={job.company}/>
              ))}
            </datalist>
            </div>
            <div>
            <label>Durum</label>
            <select onChange={(e) => dispatch(filterbySearch({field:"status",text:e.target.value})) }  name="status" >
              <option  hidden>Seçiniz</option>
              {statusOpt.map((i) => {
                return <option>{i}</option>;
              })}
            </select>
          </div>
          <div>
            <label>Tür</label>
            <select onChange={(e) => dispatch(filterbySearch({field:"type",text:e.target.value})) } name="type" >
              <option  hidden>Seçiniz</option>
              {typeOpt.map((i) => {
                return <option>{i}</option>;
              })}
            </select>
          </div>
          <div>
            <label>Sırala</label>
            <select onChange={(e) => dispatch(sortJobs(e.target.value))} name="type" >
              {sortsOpt.map((i) => {
                return <option>{i}</option>;
              })}
            </select>
          </div>
          <div>
            <button onClick={() => dispatch(clearFilters())} className="add-button" type='reset'>
              <span class="button_top">Sıfırla</span>
            </button>
          </div>
          </form>
          </section>
    
  )
}

export default Filter
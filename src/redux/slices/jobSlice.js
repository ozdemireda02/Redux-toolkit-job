import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainJobs:[], //api'den gelen asla filtrelemediğimiz
    jobs: [], //filtreleme sonucu elde ettiklerimizi aktardığımız
    isLoading :false,
    isError :false,
}

const jobSlice = createSlice({
    name:"jobs",
    initialState,
    reducers:{
        // yüklenme durumunu günceller
        setLoading:(state) => {
            state.isLoading = true;
        },
        // api den gelen verileri state'e aktarır
        setJobs:(state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.jobs = action.payload;
            state.mainJobs = action.payload;
        },
        // hata durumunu günceller
        setError:(state) => {
            state.isLoading = false;
            state.isError = true ;
        },
        // yeni iş ekler
        createJob:(state,action) => {
            state.jobs.push(action.payload);
        },
        // aratılan şirket ismine göre filtreleme yapma
        filterbySearch : (state,action) => {
        //arama terimini küçük harfe çevir
        const query = action.payload.text.toLowerCase();
        // arama terimini içeren işleri filtrele
        const filtred = state.mainJobs.filter((job) => job[action.payload.field].toLowerCase().includes(query)) ;
        // state i güncelle
        state.jobs = filtred
        },

        // sıralama
        sortJobs: (state, action) => {
        switch (action.payload) {
          case 'a-z':
            state.jobs.sort((a, b) =>
              a.company.localeCompare(b.company)
            );
            break;
  
          case 'z-a':
            state.jobs.sort((a, b) =>
              b.company.localeCompare(a.company)
            );
            break;
  
          case 'En Yeni':
            state.jobs.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
  
          case 'En Eski':
            state.jobs.sort(
              (a, b) => new Date(a.date) - new Date(b.date)
            );
            break;
          default:
            break;
        }
      },
  
        // sıfırlama
        clearFilters: (state) => {
        state.jobs = state.mainJobs;
       },
  
        // iş silme
        deleteJob: (state, action) => {
        state.jobs = state.jobs.filter((i) => i.id !== action.payload);
       },
    },
  });

export const {setLoading,setError,setJobs,createJob,filterbySearch,sortJobs,clearFilters,deleteJob} = jobSlice.actions;

export default jobSlice.reducer;
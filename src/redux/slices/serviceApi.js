import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const docApi = createApi({
    reducerPath: 'docApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
    endpoints: (builder) => ({
        // Login api
        getAllUser: builder.query({
            query: (token) => ({
                url: 'user/details',
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            }),
        }),

        // Doctor api
        getAllDoctor: builder.query({
            query: () => ({
                url: 'user/doctors',
                method: 'GET'
            }),
        }),
        getSingleDoctor: builder.query({
            query: (slug) => ({
                url: `user/doctor/${slug}`,
                method: 'GET'
            }),
        }),
        getSlotByDr: builder.query({
            query: (slug) => ({
                url: `app/all_slot/${slug}`,
                method: 'GET'
            }),
        }),
        getSlotByDate: builder.query({
            query: (slug, date) => {
                return {
                    url: `app/all_slot/${slug}/${date}`,
                    method: 'GET'
                };
            },
        }),

        // Patient api
        getAllPatient: builder.query({
            query: () => ({
                url: 'user/all_patient',
                method: 'GET'
            }),
        }),

        // Gallery api
        getAllGallery: builder.query({
            query: () => ({
                url: 'app/allGImages',
                method: 'GET'
            }),
        }),

        // Blog api
        getAllBlog: builder.query({
            query: () => ({
                url: 'app/blogs',
                method: 'GET'
            }),
        }),

        // allRating api
        getRating: builder.query({
            query: (token) => ({
                url: 'app/allRating',
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            }),
        }),

        // Appointment api
        addAppointment: builder.mutation({
            query: (body) => ({
                url: "page",
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
        }),
        getAppointment: builder.query({
            query: (token) => ({
                url: 'app/appointments',
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}`
                }
            }),
        }),
    }),
})

export const {
    useGetAllUserQuery,
    useGetAllDoctorQuery,
    useGetSingleDoctorQuery,
    useGetAllGalleryQuery,
    useGetAllBlogQuery,
    useAddAppointmentMutation,
    useGetSlotByDrQuery,
    useGetAllPatientQuery,
    useGetSlotByDateQuery,
    useGetAppointmentQuery,
    useGetRatingQuery
} = docApi
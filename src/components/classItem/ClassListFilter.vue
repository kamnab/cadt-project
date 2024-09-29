<template>
    <div>
        <!-- User Input Fields for Filtering -->
        <input v-model="tempFilters.schoolName" @keydown.enter="applyFilter" placeholder="School Name" />
        <input v-model="tempFilters.province" @keydown.enter="applyFilter" placeholder="Province" />
        <input v-model="tempFilters.type" @keydown.enter="applyFilter" placeholder="Type (Public/Private)" />

        <!-- Checkbox for Model School Standard Status -->
        <label>
            <input type="checkbox" v-model="tempFilters.modelSchoolStandardStatus" @keydown.enter="applyFilter" />
            Model School Standard Status
        </label>

        <!-- Filter Button -->
        <button @click="applyFilter">Apply Filter</button>

        <!-- Filtered Results -->
        <ul>
            <li v-for="item in filteredData" :key="item.id">
                <div><strong>School Name:</strong> {{ item.schoolName }}</div>
                <div><strong>Province:</strong> {{ item.province }}</div>
                <div><strong>Type:</strong> {{ item.type }}</div>
                <div><a :href="item.profileLink" target="_blank">Profile Link</a></div>
                <div><a :href="item.evalEarlyYearLink" target="_blank">Evaluation Early Year Link</a></div>
                <div><a :href="item.evalEndYearLink" target="_blank">Evaluation End Year Link</a></div>
                <div><strong>Model School Standard Status:</strong> {{ item.modelSchoolStandardStatus ? 'Yes' : 'No' }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Sample data
const dataList = ref([
    {
        id: 1,
        schoolName: 'Maple High School',
        province: 'Ontario',
        type: 'Public',
        profileLink: 'https://example.com/maple-profile',
        evalEarlyYearLink: 'https://example.com/maple-early',
        evalEndYearLink: 'https://example.com/maple-end',
        modelSchoolStandardStatus: true
    },
    {
        id: 2,
        schoolName: 'Westwood Elementary',
        province: 'British Columbia',
        type: 'Private',
        profileLink: 'https://example.com/westwood-profile',
        evalEarlyYearLink: 'https://example.com/westwood-early',
        evalEndYearLink: 'https://example.com/westwood-end',
        modelSchoolStandardStatus: false
    }
]);

// Temporary filters that the user types before applying the filter
const tempFilters = ref({
    schoolName: '',
    province: '',
    type: '',
    modelSchoolStandardStatus: false // Unchecked by default
});

// Active filters for actual filtering after button click or Enter key press
const filters = ref({
    schoolName: '',
    province: '',
    type: '',
    modelSchoolStandardStatus: false
});

// Function to apply the temporary filter values to the actual filters on button click or Enter key press
const applyFilter = () => {
    filters.value = { ...tempFilters.value };
};

// Computed property to filter data based on the filters
const filteredData = computed(() => {
    return dataList.value.filter(item => {
        return (
            (!filters.value.schoolName || item.schoolName.toLowerCase().includes(filters.value.schoolName.toLowerCase())) &&
            (!filters.value.province || item.province.toLowerCase().includes(filters.value.province.toLowerCase())) &&
            (!filters.value.type || item.type.toLowerCase().includes(filters.value.type.toLowerCase())) &&
            (!filters.value.modelSchoolStandardStatus || item.modelSchoolStandardStatus === filters.value.modelSchoolStandardStatus)
        );
    });
});
</script>
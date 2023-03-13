<script>
export default {
    props: ['category', 'index']
}
</script>

<template>
    <option :value="category.id">{{ index+1 }}. {{ category.name }}</option>
</template>
export default {
    methods: {
        parseDate(date) {
            let d = new Date(Date.parse(date));
            return new Intl.DateTimeFormat('en-US', {
                month: 'long',
                year: 'numeric',
                day: '2-digit'
            }).format(d);
        },
        parseDateShort(date) {
            let d = new Date(Date.parse(date));
            return new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: '2-digit'
            }).format(d);
        },
        parseTime(date) {
            let d = new Date(Date.parse(date));
            return `${d.getHours()}:${d.getMinutes()}`;
        }
    }
}

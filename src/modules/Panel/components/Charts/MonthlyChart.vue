<script>
import { Bar } from 'vue3-chart-v2'

export default{
  name: 'MonthlyChart',
  extends: Bar,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        },
        {
          label: 'My Commits',
          backgroundColor: '#2980b9',
          data: [12, 50, 1, 25, 4, 50, 26, 50, 40, 31, 12, 19]
        }
      ]
    })
  }
}
</script>
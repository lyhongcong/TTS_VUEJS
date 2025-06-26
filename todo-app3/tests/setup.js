import '@testing-library/jest-dom'
import { config } from '@vue/test-utils'

// Nếu dùng i18n hoặc global mocks, có thể thêm:
config.global.mocks = {
  $t: (msg) => msg
}

// Không mock axios ở đây! 
// Hãy dùng MSW trong mocks/handlers.js hoặc mock axios riêng cho từng test nếu cần.
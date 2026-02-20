import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { RestaurantPage } from '@/pages/RestaurantPage'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { OrderTrackingPage } from '@/pages/OrderTrackingPage'
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/restaurant/:id",
    element: <RestaurantPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/order/:id",
    element: <OrderTrackingPage />,
    errorElement: <RouteErrorBoundary />,
  }
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
)
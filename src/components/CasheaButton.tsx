
// FILE: src/components/CasheaButton.tsx
import { useEffect, useRef, type FC } from 'react';
import CheckoutSDK from 'cashea-web-checkout-sdk';
import { useCartStore } from '@/stores/cartStore';
import { instructors } from '@/data/instructors'; // Import instructor data

// Define the structure for the props this component will receive
interface CasheaButtonProps {
  customer: {
    identificationNumber: string;
    fullName: string;
    email: string;
  };
}

// These values are from the Cashea credentials file.
const CASHEA_STORE_ID = 19830; // For 'Web Voice Academy'
const CASHEA_STORE_NAME = 'Web Voice Academy';
const EXTERNAL_CLIENT_ID = '1609'; // This should be a string as per SDK examples

export const CasheaButton: FC<CasheaButtonProps> = ({ customer }) => {
  const { items } = useCartStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const sdkRef = useRef<any | null>(null);

  useEffect(() => {
    // Ensure this effect runs only once by checking if the SDK is already instantiated
    if (containerRef.current && !sdkRef.current) {
      const apiKey = import.meta.env.VITE_CASHEA_PUBLIC_API_KEY;
      if (!apiKey) {
        console.error('VITE_CASHEA_PUBLIC_API_KEY is not defined in .env file');
        containerRef.current.innerHTML = '<p style="color: red;">Error de configuración de Cashea.</p>';
        return;
      }

      sdkRef.current = new CheckoutSDK({ apiKey });

      const payload = {
        identificationNumber: customer.identificationNumber.replace(/[^0-9]/g, ''),
        externalClientId: EXTERNAL_CLIENT_ID,
        deliveryMethod: 'IN_STORE',
        merchantName: CASHEA_STORE_NAME,
        redirectUrl: `${window.location.origin}/payment/success`,
        invoiceId: `VA-WEB-${Date.now()}`,
        deliveryPrice: 0,
        orders: [
          {
            store: {
              id: CASHEA_STORE_ID,
              name: CASHEA_STORE_NAME,
              enabled: true,
            },
            products: items.map(item => {
              const instructorSlug = item.instructorSlugs?.[0];
              const instructor = instructorSlug
                ? instructors.find(i => i.slug === instructorSlug)
                : undefined;

              let imageUrl = instructor?.imageUrl;

              if (!imageUrl) {
                imageUrl = `${window.location.origin}/assets/logo-solo.png`;
              } else if (!imageUrl.startsWith('http')) {
                const slash = imageUrl.startsWith('/') ? '' : '/';
                imageUrl = `${window.location.origin}${slash}${imageUrl}`;
              }

              // FINAL FIX: Encode the URL to handle special characters and spaces.
              const finalImageUrl = encodeURI(imageUrl);

              return {
                id: item.slug,
                name: item.title,
                sku: item.slug,
                description: item.shortDescription || item.title,
                imageUrl: finalImageUrl, // Use the ENCODED URL
                quantity: item.quantity,
                price: item.price,
                tax: 0,
                discount: 0,
              };
            }),
          },
        ],
      };

      try {
        sdkRef.current.createCheckoutButton({
          payload,
          container: containerRef.current,
        });
      } catch (error) {
        console.error('Failed to create Cashea checkout button:', error);
        containerRef.current.innerHTML = '<p style="color: red;">No se pudo cargar el botón de pago de Cashea.</p>';
      }
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        sdkRef.current = null;
      }
    };
  }, [items, customer]);

  return <div ref={containerRef} id="cashea-checkout-container"></div>;
};

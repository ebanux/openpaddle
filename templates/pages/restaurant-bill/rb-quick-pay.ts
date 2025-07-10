
import { Template, RestaurantBillPageLinkConfig, MonetizationUseCase } from '../../../types';
import { DEFAULT_PAGE_STYLE } from '../../../constants';

export const quickRestaurantBillTemplate: Template<RestaurantBillPageLinkConfig> = {
    id: 'rb-quick-pay',
    name: 'Quick Restaurant Bill',
    useCase: MonetizationUseCase.RESTAURANT_BILL,
    description: 'A quick way for diners to pay their bill by scanning a QR code at the table.',
    previewIcon: 'restaurant_menu',
    previewColorClass: 'bg-red-100',
    previewIconColorClass: 'text-red-600',
    initialData: {
      id: '', pageId: '', tenantId: '', status: 'draft',
      useCase: MonetizationUseCase.RESTAURANT_BILL,
      pageSlug: 'pay-my-bill',
      pageStyle: { ...DEFAULT_PAGE_STYLE, theme: 'light' },
      mode: 'payment',
      currency: 'USD',
      line_items: [
        { id: 'item_burger', quantity: 1, price_data: { currency: 'usd', unit_amount: 1250, product_data: { name: 'Classic Burger' } } },
        { id: 'item_fries', quantity: 1, price_data: { currency: 'usd', unit_amount: 400, product_data: { name: 'Large Fries' } } },
        { id: 'item_soda', quantity: 2, price_data: { currency: 'usd', unit_amount: 250, product_data: { name: 'Soda (Refill)' } } },
      ],
      after_completion: { type: 'custom_page_session' },
      pageTitle: "Pay Your Bill",
      defaultTaxRate: 0.08,
      predefinedTipPercentages: [0.15, 0.18, 0.20],
      afterPaymentBehavior: 'showAfterPaymentPage',
      selectedAfterPaymentTemplateId: 'ap-rb-receipt-v1',
    } as RestaurantBillPageLinkConfig,
  };

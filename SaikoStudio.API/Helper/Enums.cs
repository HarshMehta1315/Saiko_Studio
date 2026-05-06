namespace SaikoStudio.API.Helper
{
    public enum UserRoleType
    {
        Admin,
        Customer,
        Guest
    }

    public enum OrderStatusType
    {
        Pending,
        Processing,
        Shipped,
        Delivered,
        Cancelled,
        Refunded
    }

    public enum PaymentStatusType
    {
        Pending,
        Completed,
        Failed,
        Refunded
    }

    public enum PaymentMethodType
    {
        CreditCard,
        DebitCard,
        PayPal,
        BankTransfer,
        CashOnDelivery,
        UPI
    }

    public enum ProductStatusType
    {
        Active,
        Inactive,
        OutOfStock,
        Discontinued
    }
}

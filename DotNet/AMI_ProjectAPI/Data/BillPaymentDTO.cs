public class BillPaymentDTO
{
    public decimal AmountPaid { get; set; }
    public string PaymentMode { get; set; } = string.Empty;
    public DateTime PaymentDate { get; set; }
}

const getDetailsJSON = (payer, payee, res) => {
    return {
        payment_id: res.id,
        from: payer.tag,
        to: payee.tag,
        amount: res.amount/100,
        currency: res.currency,
        payment_status: res.status,
        reference_id: res.reference_id,
        payment_link: res.short_url,
        from_avatar: payer.displayAvatarURL(),
        to_avatar: payee.displayAvatarURL(),
        platform: "discord",
    }
}

export { getDetailsJSON };
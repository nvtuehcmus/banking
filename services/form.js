const form = {
    verify(verifyUrl){
        return `<div style="font-family:Helvetica,sans-serif">
        <div style="width:600px;height:100%;margin:auto">
      <div style="margin:40px 0 44px 0">
        <a style="color:#871fff;text-decoration:none" href="#" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://dashboard.nexmo.com/&amp;source=gmail&amp;ust=1594566349844000&amp;usg=AFQjCNHFbvTEWXDJHiFV5NB7fqjRpDDzpw">
          <img src="https://user-images.githubusercontent.com/63330428/87238652-945f4500-c42f-11ea-9837-c76af497ce93.png" style="vertical-align:middle;width:45%;height:auto;max-width:100%;border-width:0" alt="Tbank" data-image-whitelisted="" class="CToWUd">
        </a>
        <div>
          <div>
            <h1 style="font-family:Verdana,Helvetica,sans-serif;font-weight:normal;font-size:32px;line-height:48px">
               
    Xác nhận địa chỉ email của bạn
            </h1>
          </div>
      </div>
      </div>
    
    <div>
        <div style="margin-top:24px;font-size:16px">
          XIN CHÀO,
        </div>
    
        <div>
          <p style="font-size:16px;margin-bottom:16px;line-height:24px">
            Cảm ơn bạn đã đăng ký Tbank.</p>
          <p style="font-size:16px;margin-bottom:16px;line-height:24px">
            Để có quyền truy cập vào tài khoản của bạn, vui lòng xác minh địa chỉ email của bạn bằng cách nhấp vào liên kết bên dưới.</p>
          <p style="font-size:16px;margin-bottom:16px;line-height:24px">
            <a href="${verifyUrl}" style="background:#214194;color:#fff;font-size:14px;border:0;border-radius:4px;display:inline-block;line-height:24px;margin:8px 0;min-height:20px;outline:0;padding:8px 20px;text-align:center;vertical-align:middle;white-space:nowrap;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://dashboard.nexmo.com/activation/nvtuehcmus%2540gmail.com/b74f9ffee7487401e40968d994e69579?utm_source%3Dnexmo_dashboard%26utm_medium%3Demail%26utm_campaign%3Dverify_your_email&amp;source=gmail&amp;ust=1594568628278000&amp;usg=AFQjCNGcCM4QIaeCsp--tGFX7FmCgxSS_A">Xác nhận địa chỉ email</a>
          </p>
        </div>
    </div>
    
    <p>
          <span style="line-height:24px;font-size:16px">Trân trọng,</span><br>
          <span style="line-height:24px;font-size:16px">ngân hàng việt nam phát triển - toàn diện</span>
        </p>
          <hr style="margin:40px 0 20px 0;display:block;height:1px;border:0;border-top:1px solid #c4cdd5;padding:0">
          <footer style="margin-bottom:40px">
            <span style="color:#919eab;line-height:28px;font-size:12px">Tbank, 324 lê hồng phong, phường 1, quận 10, TP.HCM, Việt Nam</span><br>
            <span style="color:#919eab;line-height:28px;font-size:12px">
                Bạn đã nhận được điều này bởi vì bạn là người dùng Tbank đã đăng ký. vui lòng không trả lời tin này</span><br>
                <span style="color:#919eab;line-height:28px;font-size:12px">
                   mọi thắc mắc vui lòng liên hệ <a style="color:#919eab;line-height:28px;font-size:12px"  href="tel:0329579782">0329579782</a>  CEO-FOUNDER: Nguyễn văn Tuệ</span><br>
    
          </footer><div class="yj6qo"></div><div class="adL">
          </div></div><div class="adL">
      </div></div>`
    },
    transaction(curentId,option,balance,change,time,fromId,toId,description){
      return `<div style="font-family:Helvetica,sans-serif">
      <div style="width:600px;height:100%;margin:auto">
    <div style="margin:40px 0 44px 0">
      <a style="color:#871fff;text-decoration:none" href="#" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://dashboard.nexmo.com/&amp;source=gmail&amp;ust=1594566349844000&amp;usg=AFQjCNHFbvTEWXDJHiFV5NB7fqjRpDDzpw">
        <img src="https://user-images.githubusercontent.com/63330428/87238652-945f4500-c42f-11ea-9837-c76af497ce93.png" style="vertical-align:middle;width:45%;height:auto;max-width:100%;border-width:0" alt="Tbank" data-image-whitelisted="" class="CToWUd">
      </a>
      <div>
        <div>
          <h1 style="font-family:Verdana,Helvetica,sans-serif;font-weight:normal;font-size:32px;line-height:48px">
            Giao dịch thành công
          </h1>
        </div>
    </div>
    </div>
  
  <div>
      <div style="margin-top:24px;font-size:16px">
        XIN CHÀO,
      </div>
  
      <div>
        <p style="font-size:16px;margin-bottom:16px;line-height:24px">
          số tài khoản ${curentId} vừa ${option} ${change}VNĐ vào lúc ${time}.<br>
          số dư hiện tại ${balance}</p>
        <p style="font-size:16px;margin-bottom:16px;line-height:24px">
        thông tin giao dịch:<br>
        từ: ${fromId} <br>
        đến: ${toId}<br>
        số tiền: ${change}VNĐ<br>
        nội dung giao dịch: ${description}
         </p>
      </div>
  </div>
  <p>
        <span style="line-height:24px;font-size:16px">Trân trọng,</span><br>
        <span style="line-height:24px;font-size:16px">ngân hàng việt nam phát triển - toàn diện</span>
      </p>
        <hr style="margin:40px 0 20px 0;display:block;height:1px;border:0;border-top:1px solid #c4cdd5;padding:0">
        <footer style="margin-bottom:40px">
          <span style="color:#919eab;line-height:28px;font-size:12px">Tbank, 324 lê hồng phong, phường 1, quận 10, TP.HCM, Việt Nam</span><br>
          <span style="color:#919eab;line-height:28px;font-size:12px">
              Bạn đã nhận được điều này bởi vì bạn là người dùng Tbank đã đăng ký. vui lòng không trả lời tin này.</span><br>
              <span style="color:#919eab;line-height:28px;font-size:12px">
                 mọi thắc mắc vui lòng liên hệ <a style="color:#919eab;line-height:28px;font-size:12px"  href="tel:0329579782">0329579782</a>  CEO-FOUNDER: Nguyễn văn Tuệ</span><br>
        </footer><div class="yj6qo"></div><div class="adL">
        </div></div><div class="adL">
    </div></div>`
    },
    resetPassword(pass){
      return `<div style="font-family:Helvetica,sans-serif">
      <div style="width:600px;height:100%;margin:auto">
    <div style="margin:40px 0 44px 0">
      <a style="color:#871fff;text-decoration:none" href="#" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://dashboard.nexmo.com/&amp;source=gmail&amp;ust=1594566349844000&amp;usg=AFQjCNHFbvTEWXDJHiFV5NB7fqjRpDDzpw">
        <img src="https://user-images.githubusercontent.com/63330428/87238652-945f4500-c42f-11ea-9837-c76af497ce93.png" style="vertical-align:middle;width:45%;height:auto;max-width:100%;border-width:0" alt="Tbank" data-image-whitelisted="" class="CToWUd">
      </a>
      <div>
        <div>
          <h1 style="font-family:Verdana,Helvetica,sans-serif;font-weight:normal;font-size:32px;line-height:48px">
             
  Xác nhận địa chỉ email của bạn
          </h1>
        </div>
    </div>
    </div>
  
  <div>
      <div style="margin-top:24px;font-size:16px">
        XIN CHÀO,
      </div>
  
      <div>
        <p style="font-size:16px;margin-bottom:16px;line-height:24px">
          Cảm ơn bạn đã sử dụng dịch vụ của Tbank.</p>
        <p style="font-size:16px;margin-bottom:16px;line-height:24px">
          Mật khẩu của bạn đã được thay đổi thành công.<br>
          Mật khẩu hiện tại là: ${pass}</p>
      </div>
  </div>
  
  <p>
        <span style="line-height:24px;font-size:16px">Trân trọng,</span><br>
        <span style="line-height:24px;font-size:16px">ngân hàng việt nam phát triển - toàn diện</span>
      </p>
        <hr style="margin:40px 0 20px 0;display:block;height:1px;border:0;border-top:1px solid #c4cdd5;padding:0">
        <footer style="margin-bottom:40px">
          <span style="color:#919eab;line-height:28px;font-size:12px">Tbank, 324 lê hồng phong, phường 1, quận 10, TP.HCM, Việt Nam</span><br>
          <span style="color:#919eab;line-height:28px;font-size:12px">
              Bạn đã nhận được điều này bởi vì bạn là người dùng Tbank đã đăng ký. vui lòng không trả lời tin này</span><br>
              <span style="color:#919eab;line-height:28px;font-size:12px">
                 mọi thắc mắc vui lòng liên hệ <a style="color:#919eab;line-height:28px;font-size:12px"  href="tel:0329579782">0329579782</a>  CEO-FOUNDER: Nguyễn văn Tuệ</span><br>
  
        </footer><div class="yj6qo"></div><div class="adL">
        </div></div><div class="adL">
    </div></div>`
    },
    trans(token){
      return `
      <div style="font-family:Helvetica,sans-serif">
    <div style="width:600px;height:100%;margin:auto">
  <div style="margin:40px 0 44px 0">
    <a style="color:#871fff;text-decoration:none" href="#" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://dashboard.nexmo.com/&amp;source=gmail&amp;ust=1594566349844000&amp;usg=AFQjCNHFbvTEWXDJHiFV5NB7fqjRpDDzpw">
      <img src="https://user-images.githubusercontent.com/63330428/87238652-945f4500-c42f-11ea-9837-c76af497ce93.png" style="vertical-align:middle;width:45%;height:auto;max-width:100%;border-width:0" alt="Tbank" data-image-whitelisted="" class="CToWUd">
    </a>
    <div>
      <div>
        <h1 style="font-family:Verdana,Helvetica,sans-serif;font-weight:normal;font-size:32px;line-height:48px">
           
Xác nhận địa chỉ email của bạn
        </h1>
      </div>
  </div>
  </div>

<div>
    <div style="margin-top:24px;font-size:16px">
      XIN CHÀO,
    </div>

    <div>
      <p style="font-size:16px;margin-bottom:16px;line-height:24px">
        Cảm ơn bạn đã sử dụng dịch vụ của Tbank.</p>
      <p style="font-size:16px;margin-bottom:16px;line-height:24px">
        đây là mã xác nhận của bạn TUYỆT ĐỐI KHONG CUNG CẤP MÃ XÁC NHẬN CHO NGƯỜI KHÁC ĐỂ TRÁNH BỊ LỢI DỤNG.<br> MÃ XÁC NHẬN CỦA QUÝ KHÁCH LÀ <br></p>
      <p style="font-size:16px;margin-bottom:16px;line-height:24px">
        ${token}
      </p>
    </div>
</div>

<p>
      <span style="line-height:24px;font-size:16px">Trân trọng,</span><br>
      <span style="line-height:24px;font-size:16px">ngân hàng việt nam phát triển - toàn diện</span>
    </p>
      <hr style="margin:40px 0 20px 0;display:block;height:1px;border:0;border-top:1px solid #c4cdd5;padding:0">
      <footer style="margin-bottom:40px">
        <span style="color:#919eab;line-height:28px;font-size:12px">Tbank, 324 lê hồng phong, phường 1, quận 10, TP.HCM, Việt Nam</span><br>
        <span style="color:#919eab;line-height:28px;font-size:12px">
            Bạn đã nhận được điều này bởi vì bạn là người dùng Tbank đã đăng ký. vui lòng không trả lời tin này</span><br>
            <span style="color:#919eab;line-height:28px;font-size:12px">
               mọi thắc mắc vui lòng liên hệ <a style="color:#919eab;line-height:28px;font-size:12px"  href="tel:0329579782">0329579782</a>  CEO-FOUNDER: Nguyễn văn Tuệ</span><br>

      </footer><div class="yj6qo"></div><div class="adL">
      </div></div><div class="adL">
  </div></div>`
    }
}
module.exports = form;
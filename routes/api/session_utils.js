
module.exports.generateSessionToken = function generateSessionToken(done, onError){
    crypto.randomBytes(18, function(err, buf) {
        if (err){
          onError(err);
        }else done(URLSafeBase64.encode(buf));
    });
}
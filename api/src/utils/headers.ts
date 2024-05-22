export const getAccessTokenFromHeaders = ({
  authorization
}: {
  authorization?: string
}) => ({ accessToken: authorization?.split(' ')[1] })

export const getSignatureFromHeaders = (
  Signature
    : string | string[] | undefined
) => ({ signature: Signature })

const GOOGLE_API_KEY = "AIzaSyCH4-raSdNOS-8tcDmG_G3FX44EIngrVj4";
export function getMapPreview(lat, lng) {
  const imgPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${lng}
&key=${GOOGLE_API_KEY}`;
  return imgPreviewUrl;
}

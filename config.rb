http_images_path = "images"

asset_host do |asset|
  ".." % (asset.hash % 4)
end

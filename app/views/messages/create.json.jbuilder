json.content @message.content
json.image @message.image_url
json.created_at @message.created_at.in_time_zone('Tokyo').strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name
json.id @message.id
json.group_id @message.group_id
class PayStayZone < ApplicationRecord
    has_many :parking_bays
    has_many :parking_restrictions
end

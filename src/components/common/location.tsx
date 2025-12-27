"use client"
import { useState, useRef, useEffect } from "react"
import styles from '@/styles/components/location.module.css'
import { LEBANESE_LOCATIONS } from "@/utils/locations"
import { useLanguage } from "@/context/languageContext"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronRight, LocateFixed, MapPin, ChevronLeft } from "lucide-react"
import { LebaneseDistrict, LebaneseGovernorate,  } from "@/types/location"

type ViewType = 'governorates' | 'districts' | 'towns'

export default function LocationSelect() {
  const { locale, messages } = useLanguage()
  const router = useRouter()
  const [selectedValue, setSelectedValue] = useState("lebanon")
  const [selectedLabel, setSelectedLabel] = useState("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentView, setCurrentView] = useState<ViewType>('governorates')
  const [selectedGovernorate, setSelectedGovernorate] = useState<LebaneseGovernorate | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<LebaneseDistrict | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const isRTL = locale === "ar"

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showDropdown])

  const getName = (obj: { name: { en?: string; ar?: string } }, lang: 'en' | 'ar'): string => {
    return obj.name[lang] || obj.name.en || obj.name.ar || ''
  }

  const resetView = () => {
    setCurrentView('governorates')
    setSelectedGovernorate(null)
    setSelectedDistrict(null)
    setSearchQuery("")
  }

  const handleGovernorateSelect = (governorate: LebaneseGovernorate) => {
    if (governorate.districts.length === 1) {
      setSelectedDistrict(governorate.districts[0])
      setCurrentView('towns')
    } else {
      setSelectedGovernorate(governorate)
      setCurrentView('districts')
    }
  }

  const handleDistrictSelect = (district: LebaneseDistrict) => {
    setSelectedDistrict(district)
    setCurrentView('towns')
  }

  const handleTownSelect = (townId: string, townName: string) => {
    router.push(`/locations/${selectedGovernorate?.id}/${selectedDistrict?.id}/${townId}?lang=${locale}`)
    setSelectedValue(`town-${townId}`)
    setSelectedLabel(`${getName(selectedGovernorate!, locale)} - ${getName(selectedDistrict!, locale)} - ${townName}`)
    setShowDropdown(false)
    resetView()
  }

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedValue("current")
          setSelectedLabel(messages.location.current_location)
          setShowDropdown(false)
          resetView()
        },
        (error) => {
          console.error("Error getting location:", error)
          alert(messages.location.geolocation_error)
        }
      )
    } else {
      alert(messages.location.geolocation_unsupported)
    }
  }

  const renderBreadcrumb = () => {
    return (
      <div className={styles.breadcrumb}>
        {selectedGovernorate && (
          <div className={styles.currentSelection}>
            <span className={styles.selectionLabel}>
              {currentView === 'districts' 
                ? messages.location.districts
                : messages.location.towns
              }
            </span>
            <span className={styles.selectionName}>
              {getName(selectedGovernorate, locale)}
            </span>
          </div>
        )}
      </div>
    )
  }

  const renderGovernorates = () => {
    const filteredGovernorates = LEBANESE_LOCATIONS.filter(gov => {
      if (!searchQuery.trim()) return true
      const query = searchQuery.toLowerCase()
      const govName = getName(gov, locale).toLowerCase()
      return govName.includes(query)
    })

    return (
      <>
        <div
          className={`${styles.locationItem} ${selectedValue === "lebanon" ? styles.selected : ""}`}
          onClick={() => {
            setSelectedValue("lebanon")
            setSelectedLabel(messages.location.all_lebanon)
            setShowDropdown(false)
            resetView()
          }}
        >
          <span className={styles.locationName}>
            {messages.location.all_lebanon}
          </span>
        </div>

        {filteredGovernorates.map(governorate => (
          <div
            key={governorate.id}
            className={styles.locationItem}
            onClick={() => handleGovernorateSelect(governorate)}
          >
            <span className={styles.locationName}>
              {getName(governorate, locale)}
            </span>
            <ChevronRight size={20} className={isRTL ? styles.rtlIcon : ''} />
          </div>
        ))}

        {filteredGovernorates.length === 0 && (
          <div className={styles.noResults}>
            {messages.location.no_locations}
          </div>
        )}
      </>
    )
  }

  const renderDistricts = () => {
    if (!selectedGovernorate) return null
    
    const filteredDistricts = selectedGovernorate.districts.filter(district => {
      if (!searchQuery.trim()) return true
      const query = searchQuery.toLowerCase()
      const districtName = getName(district, locale).toLowerCase()
      return districtName.includes(query)
    })

    return (
      <>
        {filteredDistricts.map(district => (
          <div
            key={district.id}
            className={styles.locationItem}
            onClick={() => handleDistrictSelect(district)}
          >
            <span className={styles.locationName}>
              {getName(district, locale)}
            </span>
            <ChevronRight size={20} className={isRTL ? styles.rtlIcon : ''} />
          </div>
        ))}

        {filteredDistricts.length === 0 && (
          <div className={styles.noResults}>
            {messages.location.no_locations}
          </div>
        )}
      </>
    )
  }

  const renderTowns = () => {
    if (!selectedDistrict) return null
    
    const filteredTowns = selectedDistrict.towns.filter(town => {
      if (!searchQuery.trim()) return true
      const query = searchQuery.toLowerCase()
      const townName = town.name[locale]?.toLowerCase() || town.name.en?.toLowerCase() || ''
      return townName.includes(query)
    })

    return (
      <>
        {filteredTowns.map(town => (
          <div
            key={town.id}
            className={styles.locationItem}
            onClick={() => handleTownSelect(town.id, town.name[locale] || town.name.en || '')}
          >
            <span className={styles.locationName}>
              {town.name[locale] || town.name.en}
            </span>
          </div>
        ))}

        {filteredTowns.length === 0 && (
          <div className={styles.noResults}>
            {messages.location.no_locations}
          </div>
        )}
      </>
    )
  }

  return (
    <div className={styles.locationContainer} ref={dropdownRef}>
      <div 
        className={styles.selectorWrapper}
        onClick={() => {
          setShowDropdown(!showDropdown)
          if (!showDropdown) resetView()
        }}
      >
        <MapPin size={20} color="#fcde68"/>
        <span className={styles.selectedText}>{selectedLabel || 'Lebanon'}</span>
        <ChevronDown size={20}/>
      </div>

      {showDropdown && (
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdownContent}>
            <div className={styles.searchContainer}>
              <div className={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder={messages.location.search_placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>
            </div>

            <div 
              className={styles.currentLocation}
              onClick={handleGetCurrentLocation}
            >
              <LocateFixed size={20} color="#dc3545"/>
              <span>{messages.location.use_current_location}</span>
            </div>

            <div className={styles.textLocation}>{messages.location.choose_location}</div>

            <div className={styles.breadcrumbContainer}>
              {currentView !== 'governorates' && renderBreadcrumb()}
            </div>

            <div className={styles.locationsList}>
              {currentView === 'governorates' && renderGovernorates()}
              {currentView === 'districts' && renderDistricts()}
              {currentView === 'towns' && renderTowns()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
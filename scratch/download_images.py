import os
import urllib.request

images = {
    "hero_sunset.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC5LL5EN7ljKpG4rwkvgPt66ep8y_9FAoBMNBcLdbxhvTR5YYW6FVWlPgdiuLc_4IWeFj6runp-N8n_i2D11byj0SvpJfQd-rX9-5WoL6St8Ap9n22nj7TDEYmxw5Tf3OvF4WHSqYv4drySfdtddLPfY4YIwRBYX5DEzX0m1LYjCqKyn_Nlmupb3uDECDRgOar3__zcu4ky0aLbUOOKSIi76-6UwBq11R17dNoTa4l6Hguv-IxnKTwXqQ",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
    ],
    "family_worship.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCRvui1myH_iYOEhIY8lE8blZx5gZSrLimPdlqzqnEFHNeTGB054opAhw6Zq0v0V6AaJ51QD0AjmLr_V3R3AlxwZKbk-pvEZ6ekXH_YypsU9XIECwk81cm2sW6vnBUbHUeelDqR5kjPCIfaMGphEXI7lU1TMSKSpLUlbr7aSpr2Vq3qdAhl0l7BbxvsHTUywJzbXu2olQnx1I-pF0HdBFHDRhOKQUX3hd3Ij9gnVgcHTOeAiCoWeYKvAA",
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80"
    ],
    "sermon_sanctuary.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCcmWsmIVf-fKWDPTVvBKqOD5ewcOJi5r0fV6f91HrIHyDB8XzVU5hMh0RpA_BZQgr8_RMsK-sAkA4F-Ft6wZluj6Y0C9z_cvW_TSECLs4fNoHOf399dtPMGM5vkQZxEEvqXrl2zRGWW1yGdzk2oyEcQa4z750kvZXn1-U0uowttRu_Mh6txcSWmj7bFjHmVBK_SUejV28R-Ase6Ij8V1QnuHJ00ExfRRTA86_NnXKUmRLebMlgqMdEuA",
        "https://images.unsplash.com/photo-1548625361-1851e443f550?auto=format&fit=crop&w=1000&q=80"
    ],
    "sermon_bible.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCwiYU4al7UWpVzlcpWw0sTbMRedM9gW06pDif4X0GUHVtbQ9gKgDGSALEJwfN61Up8S5CqSgyMi5A-d6fcPl6qHC2O5mIJeyH8P1bh-s2vuDdL2HtbkMZNx83MUMU44wzrhHePMSDVBsba-WJAF4N0yt2AlQKiClZkaZ5sIKSXyGuTIYiolFyaFt_CNDzc2YLF78RZV_pm1wMjBrv6pONhOMhKjxK0GidFRgZNY-BztUIAX6IX-yl36A",
        "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1000&q=80"
    ],
    "sermon_misty_valley.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBASyPhCaCVqI6t0aCdoRyHtv9jgQQky4Lp5GsfJiNYB_48xgYq_s5OQbaPl-LDvHBxWyUllpCiJxnpo9mWlxSV4BzuHZOGG98bGCyB2pN_dJUAmu6RXhaxK90DzrpwWSCJ6GlLVDsHbFKqdwnAGtdRYVxI640omLAQy7U18uSZ81r4DiefrIaW-Ht_X_KXepUGdKII1YbHlJnqAUqZpGgRk0VavhIR57E9waIoTO6wOnBSYiDSKAQZ7g",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80"
    ],
    "track_thumb.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUzda_eqxvKttI7gkpfZyEeiPLSsIYSWHtwc8APO6N7OM-8ZxxPbsZLyzuzC_hql6PmNPSP9WZyNoHQhueLfWPYKuBmlud2iGW5YHDFjm0lBi0Xipwc0FNCMR18A29C-ei20wIQ8n_ZFJzY5sG1hpTczr7HLQw5crqctGorGZfnBPwNYGXDXF9HfIi7pJQjuCaXrSw7Ns1uDn_cv2Ei26bQ39Jfy_mjQnznyEtb6Cml_pC9aXRTgy6Pg",
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80"
    ],
    "watch_live_stage.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAWSUmmqCmRdxhWL4smgc1aXy1sZemnyuiMw5iuvojQgwqMkzqkI7dSDcZxYfthZBy6Wbv_7SB7D_7CFcyWFcQfk7Jps2iVp_CeNHV85GpCWKOQwKWIlTCLUjzyDqJHAeX_MnXVHxT24xf12VrrsigBuv34Al6MRku5ZRSaus2OtIVO_aqpOKSOcapiJc28glXdfBSYwDSS7MLi0hmhlotliDVIhqcic34gTBBbEyOSAkjBUT7ZCudnuQ",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80"
    ],
    "pastor_speaking.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAanxeIZIzBOVfZ_9Ry01zW-hC3qAC8KZSbYh9Qrb3no0Rdtl_umJYoY7GpGC_PzCoPEcnvDjn21fW_huuia3TV1jkQcoWWiUz79X-AO3OSsUp82CJkvplWsknUhkIjazP7bIv_SULdhe8KvH9uhXJMbWuza_N8XJU7vHliM0X2Q7qKHap86XD-MsQDrb5iABkGr7N-cvc2lFAzy9q00EyiOc4XV9TLyKd_1o_GmW0w1rY3_VafRiKQcA",
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80"
    ],
    "congregation.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDnPdt07iYS94NYRF5OoNdotiMzSOZ4CopioWnjpB_g9-bSlhd1lDIBu72G70AZx9XBb08OmfEWYEWnqO6RMOWPPVqiSR6bU9GdxzbgXXxOEwOJl8mOcaVvFpAKeA271v0_d7CzUfgpRm0-AA-4ui3POO9N3ifMzdZ75sn2PyzsOhMaBfN7unRaOFQ349qB8acaz8DZJMUyrsTkBZHPs_mrUgNmp9ilv81dEJMYZetQas7A2sHRRvOawg",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
    ],
    "bible_study.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCPY6BakFWY72UmxX4sAfv9SCFaO2gD6F1dapxS8SRpqZe9KmkgZYucZLAjLVgXmzHE9KV25XFxSgt1kkLpoxVwCASYljwMyjGLhkIvvadtgBUtdADNZxq92CZH2aSgREJ59t4ZTNZN9lzKddC5YC3OAcpwDGvug1n_nJtizhpOCgB5EHmaikqONIuVytK9x5x0Ab-0HwW0rfxLU5TWT_MNJc567a1dZG7YJuT0CulKejqJtRryGJnOGw",
        "https://images.unsplash.com/photo-1499209974431-9dac3cea004b?auto=format&fit=crop&w=800&q=80"
    ],
    "gospel_ancient_book.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIt8j_tkx9sh96KCqZvwKMoGi2OwBIUDWtWuJtJebizXYTQMZh-1kNBkdSZlADXcwGg384fpGzHSAPTe7XXlbLppHEoXEDOA7b-IqVCxec6LqKZoh-CeH-9j7L6jUEN578hVJn9aiMUni9cQu1LZ8_carzGOFh3lSYK5Y0dKP_zW0kLMYV8X4WjoyAVkivBAbDnzLe-DA8pr0ivrTpRBKwg_OYBFwMgh8dDJrI9WtLS_AVVC9k2FnbFA",
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
    ],
    "gospel_path.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCMepI8z9oQ1Q1JBylJLG2CzPkWrmL1LMWj9YSxzbwILuG5gpU8zOH3kmVdbiCj5E2R4-uD8a1_CXxlCk-Q_wGIvOI2H2nl508qIb9m2k-6GHXOHW8Ke_14zJBD2a9i0AKgeVOen1grJnFUgWBgrLXSLTm0nqzsl1zXjKY_NX0meCllz2ZtQdPYtL4ZO3cqBE-z5J92640_lXOGOgvwAbrxu9fbuBzMMR4MC-eZ55A-IYYu0yjGtJ1VTQ",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
    ],
    "salvation_sunrise.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCnzUoE3HOBXwXN_bQuAYSwssfNmdMrB-w8JAyw6R-col21yqNwN_-OJB6J3yxbTrdoUYkXviZRtEQ7F_x-giyyva1n_ZOrWENBm0gUGBBNHU6ck2bd5GFTpksHNw61BFuPA3Tm4gKOoujxQdjbzqfGioY3xCps-YN0k86seYpaJMT4ylGo10d8atgPyU7VZgb7rj12tcqWA95I9F_5ISbxGTeB9U-OjDrmQCmbtCiUN0pD-z4f9oj9kw",
        "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1200&q=80"
    ],
    "step1_forest_path.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCLHk5eEPtasAwM4N4bNb_pE7OmRdSxVlFM5lE7tU5HljzY3izSI3y2YDE3fct4Z5OeKYw60jofkpwS2XPHZbLMO8SXNE1xO_FFRyu-zF19eqP539duVcZ64840e0wVkwPGF06Ekm-n071sko2Ut03UL4zYO3z5KWk9I59UuIT528SvT14C9Zee_cNOkK6PD4iL-Nm77Dfsm_yFfjf1bnWNk2-hR2f9m6I93tHiaVCw4yESylvlaCEeNw",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80"
    ],
    "growth_olive_grove.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBFEB6DCNJH_TEk2HHLU2ZhoyqQUh5fhQnSgg02rPC55SqXi5Wqk0lN018hTi2XCTIuZpXoED-2VoHoUQWBcUp9BjaNO1oEAWvy1RBscevzGNAgrf_Hp4lXh1b-t5cWv-PRzRGA34kx5kcDMde5ji8kgLvZ0BLJU26PH107GclaFJ883m-7q8oON648kBne3-vc9dVjZ-4P2kpse7jGGjvFaLSxiqoqUDaLQG1MhJTNQkCH-CTnGx16Mw",
        "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80"
    ],
    "lesson_video_still.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuByx56JmmyYEX01lYjEOgKb0X6Qqp0pIYvsz5QZGh6Uf8fasjT-kif79T1jjhva6U-JR9hqT_-SkekO1l3K-JVT4ce16KGorEgzdMorDzrW5-cUbsVytrcWBRWv7ogXV8NgEj_AZqTmbpR6QuzGjn0Y3-z6na_ampt4LbnXS6M8w64UG9BnH6LEhz3tN-EwlenrA8iGzmRfYM8sVjTsjlG50hlNiNRhhay03jVDfoBzOYygmekEqciKZQ",
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
    ],
    "dashboard_pattern.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCVmjHgk2dLAAuUFVZQOCGaUwWOfYrwJdTc5LUxdMNnlulNOihXTTEUFy8L6qH-E1ezEjvqSRM18653uyRRUJziaWkjUAioZYsXsB9gWrrJ-VUZeXxVRJq5SJpGrtiosfzQgViqSHKEoYXry2V0YntOO_ZFs6c-vj4Vq5TDbWzOmE0i57pZ1ra_fQxL9qqek_3V1rrfHh37P3OCVyzPJUmZeOZ-mmMG0IjXWFczgun2AfN2y21Akq5o7w",
        "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80"
    ],
    "dashboard_bible_tea.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAvz3cClag32s0Tk1JTgoqd3KDQojq_CAdFtA8xzJbIcYSEuqbAFNB0XsqOtL0qXvjKphaHg3Z7yAnEJMjoUEU_s9keyr_WrAsNsXhR9y9ZuHMXfreAyMv-7-l5doAL73-fKIG-rZ5QlWOKKxiAJIdc9vcOCgLKcHhnUHddh6Br9VoMWWPRweQMB9p8jKc7fSUAYl-zbHfBuu9IhigJnm0wMqZBeaoL3yaO2UpbciotlwNqn4SgId95Ng",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"
    ],
    "event_worship.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA4vMlcweIloZA-a2onXgOX9J0V_KHHFyMl3W-l44aZ3zrAkkj4UeiUZeTx1Ful9yxUIbqWa_PwVYkJhALoM06UhNueRsEqqOTdyHktrBlkIRErQ_K5GvN4P72NjMtl58pPjkL9tVcixlaEdkAAsYanBxCyZmCi37ezYSqaoUH7i_Kwl9ounmQQOBGYfAZ_38vNNDuaPYdMPOXz1rXbUweaESfOk2ApW6LoKtdn8B5BSZauqCsoCHi9vQ",
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80"
    ],
    "event_bible_study.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB9smywB_z3LteR9e1u2m7PexSFbXUAMdcZMvoYNWRNCjkcPYaXhrjpH0TZD2RBI4v9K-QS2EetFSXQCclpamTEPZDCopHSieMMt2L-NJfsEsjg0mPqRgyXdjkAoFl6KqoXrxJnJzGtRVRYR4G-SsaTppd66vQiJoFSjr5NHojC1NRWIOVhbZNH2IYmh3JO3l22dekzIrA0hBam7zTxmQDkPhtQCpgw_rLLShVFR-pRVysh5Rp3CMqfxQ",
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80"
    ],
    "event_outreach.jpg": [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDAfthTa6gCmvCEcdKg0k3t96-GU3QlvA3k7RUCzXfYsJhvubIoXTFPsgU7oppvjdJF9qihujrbCWrwksqNKK2u8OR2AGZ4B9EkWJIogu2uCzsgKvD0XdJWJMVsha4pT-lNfTnHJp98yGW4YrzTECy8Zeeo_KkCHVQ7mmsslVBz2fRap50bM-u5e1yy2ePPiFFyU6fzBLuopqMI6Dzzkgg1lvKRfD8VJ6IklPqOthQoNVU2YNWzzuS5cw",
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80"
    ]
}

target_dir = r"c:\Users\HomePC\Documents\digital_ministry_hub\frontend\public\images"
os.makedirs(target_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for fname, urls in images.items():
    filepath = os.path.join(target_dir, fname)
    success = False
    for url in urls:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=10) as response, open(filepath, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Downloaded {fname} from {url}")
            success = True
            break
        except Exception as e:
            print(f"Failed {url}: {e}")
    if not success:
        print(f"CRITICAL: Failed to download {fname}")
